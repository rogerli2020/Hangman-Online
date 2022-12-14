from pydoc import cli
import websockets
import asyncio
import json
import time
import ssl
import pathlib
from games import Games

CURRENT_ID_COUNT = 0
GAMEVARS_PATH = "./gameserver/gamevars.json"
with open(GAMEVARS_PATH, "r") as f:
    GAMEVARS = json.load(f)

class Client:
    def __init__(self, ws, name, is_guest = True):
        self.ws = ws
        self.id = self.get_id()
        self.name = name
        self.game = None
        self.is_guest = is_guest
        self.access_token = None
        self.invalid_authorization = False

    def get_id(self):
        global CURRENT_ID_COUNT
        CURRENT_ID_COUNT += 1
        return "GUEST" + str(CURRENT_ID_COUNT - 1)
    
    async def send(self, msg):
        await self.ws.send(msg)

class Packet:
    def __init__(self, ws, msg) -> None:
        self.ws = ws
        self.msg = msg

class Packets:
    def __init__(self) -> None:
        self.packets = []
    
    def push(self, ws, msg):
        self.packets.append(Packet(ws, msg))
    
    def empty(self):
        return len(self.packets) == 0
    
    def load(self, list):
        list.extend(self.packets)
        self.packets = []
    
    def clear(self):
        self.packets = []

CLIENTS = set()
CLIENT_IDS = set()
PACKETS = Packets()
GAMES = Games(msg_pool=PACKETS, client_ids=CLIENT_IDS)

async def broadcast():
    global PACKETS
    while True:
        time.sleep(0.01)
        for p in PACKETS.packets:
            if p.ws in CLIENTS:
                await p.ws.send(json.dumps(p.msg))
                time.sleep(0.001)
        PACKETS.clear()
        await asyncio.sleep(0)

asyncio.get_event_loop().create_task(broadcast())

async def handler(websocket, path):
    global CURRENT_ID_COUNT, CLIENTS
    print("Someone connected.")
    player = Client(websocket, name=f"GUEST{CURRENT_ID_COUNT}")
    CLIENTS.add(player)
    try:
        async for msg in websocket:
            msg = json.loads(msg)
            # print(f"[received] {msg}")
            GAMES.handle_player_msg(player, msg)
    finally:
        CLIENTS.remove(player)
        if player.id in CLIENT_IDS:
            CLIENT_IDS.remove(player.id)
        GAMES.handle_player_disconnect(player)
        print("Someone disconnected.")


# ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
# ssl_context.load_cert_chain(
#     pathlib.Path(__file__).with_name("localhost.pem"))

# start_server = websockets.serve(handler, port=8765)
start_server = websockets.serve(handler, "localhost", port=8765)
print("[GAME SERVER] Game server started successfully.")
# start_server = websockets.serve(handler, "localhost", port=8765, ssl=ssl_context)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
