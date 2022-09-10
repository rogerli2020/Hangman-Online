from django.db import models

# Create your models here.
class Game(models.Model):
    pid = models.IntegerField()
    opponent_pid = models.IntegerField()
    won = models.BooleanField()
    score = models.IntegerField()
    opponent_score = models.IntegerField()
    game_datetime = models.DateTimeField(auto_now=True)

class Round(models.Model):
    gsr_id = models.IntegerField()
    ex_id = models.IntegerField()
    word = models.CharField(max_length=255)
    score = models.IntegerField()
    round_datetime = models.DateTimeField(auto_now=True)

class Word(models.Model):
    word = models.CharField(max_length=255, unique=True)
    frequency = models.IntegerField()
    avg_score = models.IntegerField()

class Player(models.Model):
    pid = models.IntegerField(unique=True)
    name = models.CharField(max_length=255, unique=True)
    win_ratio = models.IntegerField()
    games_won = models.IntegerField()
    games_lost = models.IntegerField()
    games_played = models.IntegerField()
    last_active = models.DateTimeField(auto_now=True)