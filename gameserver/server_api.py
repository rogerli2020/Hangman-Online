import sqlite3

DB_PATH = "./backend/db.sqlite3"

def post_game_data(pid, opponent_pid, won, score, opponent_score):
    conn = None
    try:
        conn = sqlite3.connect(DB_PATH)
    except Exception as e:
        print(e)

    sql = """
        INSERT INTO gamedata_game(pid, opponent_pid, won, score, opponent_score, game_datetime) VALUES (?, ?, ?, ?, ?, datetime('now'));
    """

    cur = conn.cursor()
    cur.execute(sql, [pid, opponent_pid, won, score, opponent_score])
    conn.commit()

def post_round_data(gsr_id, ex_id, word, score):
    conn = None
    try:
        conn = sqlite3.connect(DB_PATH)
    except Exception as e:
        print(e)

    sql = """
        INSERT INTO gamedata_round(gsr_id, ex_id, word, score, round_datetime) VALUES (?, ?, ?, ?, datetime('now'));
    """

    cur = conn.cursor()
    cur.execute(sql, [gsr_id, ex_id, word, score])
    conn.commit()
    
    update_word_data(word, score)
    
def update_player_data(pid, win_ratio, games_won, games_lost, games_played, name):
    # WIN RATIO = #games won/#games played.
    conn = None
    try:
        conn = sqlite3.connect(DB_PATH)
    except Exception as e:
        print(e)

    cur = conn.cursor()
    res = cur.execute("""SELECT * FROM gamedata_player WHERE pid = ?""", [pid]).fetchall()

    if len(res) == 0: # if player does not have any prior records.
        sql = """
            INSERT INTO gamedata_player(pid, win_ratio, games_won, games_lost, games_played, last_active, name) VALUES (?, ?, ?, ?, ?, datetime('now'), ?);
        """
        cur.execute(sql, [pid, games_won/1, games_won, games_lost, games_played, name])
        conn.commit()
    else:
        res = res[0]
        new_games_won = res[3] + games_won
        new_games_lost = res[4] + games_lost
        new_games_played = res[5] + games_played
        new_win_ratio = new_games_won / new_games_played

        sql = """
            UPDATE 
                gamedata_player
            SET
                win_ratio = ?,
                games_won = ?,
                games_lost = ?,
                games_played = ?,
                last_active = datetime('now')
            WHERE
                pid = ?;
        """
        cur.execute(sql, [new_win_ratio, new_games_won, new_games_lost, new_games_played, pid])
        conn.commit()

def update_word_data(word, score):
    conn = None
    try:
        conn = sqlite3.connect(DB_PATH)
    except Exception as e:
        print(e)

    cur = conn.cursor()
    res = cur.execute("""SELECT * FROM gamedata_word WHERE word = ?""", [word]).fetchall()

    if len(res) == 0: # if player does not have any prior records.
        sql = """
            INSERT INTO gamedata_word(word, frequency, avg_score) VALUES (?, ?, ?);
        """
        cur.execute(sql, [word, 1, score])
        conn.commit()
    else:
        res = res[0]
        old_frequency = res[2]
        old_avg_score = res[3]
        new_frequency = old_frequency + 1
        new_avg_score = int((old_avg_score * old_frequency + score) / (new_frequency))

        sql = """
            UPDATE 
                gamedata_word
            SET
                frequency = ?,
                avg_score = ?
            WHERE
                word = ?;
        """
        cur.execute(sql, [new_frequency, new_avg_score, word])
        conn.commit()
