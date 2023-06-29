from game import Game
from profanity_filter import ProfanityFilter
import jwt
from SECRET_KEY import SECRET_KEY

SECRET = SECRET_KEY
DB_PATH = "./backend/db.sqlite3"
PF = ProfanityFilter()

TEXT_LIMIT = 256

class Games:
    def __init__(self, msg_pool, client_ids) -> None:
        self.msg_pool = msg_pool
        self.client_ids = client_ids
        self.games = {}
        self.curr_id_count = 0
    
    def join_any_game(self, client):
        for id in self.games:
            if not self.games[id].full():
                if self.games[id].p1 != None:
                    if not self.games[id].p1.is_guest and not client.is_guest:
                        if self.games[id].p1.id == client.id:
                            continue
                self.games[id].add_player(client)
                client.game = self.games[id]
                if self.games[id].full():
                    self.games[id].start()
                    self.msg_pool.player_count_refresh()
                return
        new_game = self.create_new_game()
        new_game.add_player(client)
        client.game = new_game

    def create_new_game(self):
        new_game = Game(self.msg_pool, games=self, id=self.curr_id_count)
        self.games[self.curr_id_count] = new_game
        self.curr_id_count += 1
        print(f"[GAME CREATED] Game with GID {new_game.id} created.")
        return new_game

    def join_game_by_id(self, id):
        pass

    def handle_player_msg(self, player, message):

        if len(str(message)) > TEXT_LIMIT:
            self.msg_pool.push(
                player, {
                    "msg_type": "chat",
                    "chat_type": "warning",
                    "sender": "SERVER",
                    "content": "Request string too long. Refuse to handle."
                }
            )

        # this code is very spaghetti
        message_type = message["msg_type"]
        if message_type == "join":
            is_guest = message["is_guest"]
            player_id = message["player_id"]
            player_name = message["player_name"]
            access_token = message["access_token"]

            if not is_guest:
                player.name = player_name
                player.id = player_id
                player.is_guest = False
                self.client_ids.add(player.id)
            
            self.join_any_game(player)

            self.msg_pool.push(
                player, 
                {
                    "msg_type": "information",
                    "information_type": "your_info",
                    "content": {
                            "id": player.id,
                            "name": player.name,
                        }
                    }
            )
        else:
            if player.game is not None:
                valid_jwt = self.verify_jwt(player, message["access_token"])
                if not valid_jwt:
                    player.invalid_authorization = True
                    return
                if message["msg_type"] == "chat":
                    message["content"] = PF.censor(message["content"])
                elif message["msg_type"] == "action":
                    if message["action_type"] == "choose_word" or message["action_type"] == "change_word":
                        message["content"] = PF.censor(message["content"])
                player.game.handle_player_msg(player, message)

    def handle_player_disconnect(self, player):
        if player.game:
            player.game.handle_disconnect(player)
    
    def handle_game_finish(self, game):
        game.p1.game = None
        game.p2.game = None
        print(f"[GAME FINISHED] Game with GID {game.id} finished.")
        del self.games[game.id]
        self.msg_pool.player_count_refresh()

    def verify_jwt(self, player, token):
        if player.is_guest:
            return True
        try:
            header_data = jwt.get_unverified_header(token)
            payload = jwt.decode(
                token, 
                key=SECRET,
                algorithms=[header_data['alg'], ]
            )
            if payload["user_id"] != player.id:
                self.msg_pool.push(
                    player, {
                        "msg_type": "chat",
                        "chat_type": "warning",
                        "sender": "SERVER",
                        "content": "Invalid request. Reason: inconsistent user_id."
                    }
                )
                return False
            return True
        except Exception as e:
            print(e)
            self.msg_pool.push(
                player, {
                    "msg_type": "chat",
                    "chat_type": "warning",
                    "sender": "SERVER",
                    "content": "Invalid JSON Web Token. Please try logging in again."
                }
            )
            return False
