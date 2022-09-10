from rest_framework import serializers
from gamedata.models import *

class GameSerializer(serializers.ModelSerializer):
    model = Game
    fields = ['pid', 'opponent_pid', 'won', 'score', 'opponent_score', 'game_datetime']

class RoundSerializer(serializers.ModelSerializer):
    model = Round
    fields = ['gsr_id', 'ex_id', 'word', 'score', 'round_datetime']

class WordSerializer(serializers.ModelSerializer):
    model = Word
    fields = ['word', 'frequency', 'avg_score']

class PlayerSerializer(serializers.ModelSerializer):
    model = Player
    fields = ['pid', 'name', 'win_ratio', 'games_won', 'games_lost', 'games_played', 'last_active']