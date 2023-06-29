from django.shortcuts import render
from rest_framework.response import Response
from gamedata.models import *
from rest_framework.decorators import api_view, authentication_classes
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
import json

# Create your views here.
def get_top_players(request):
    sql = """
        SELECT *
        FROM gamedata_player
        WHERE games_played > 2
        ORDER BY win_ratio DESC
        LIMIT 5
    """
    res = [r for r in Player.objects.raw(sql)]
    for i in range(len(res)):
        res[i] = model_to_dict(res[i], fields=[field.name for field in res[i]._meta.fields])
    return JsonResponse(res, safe=False)

def get_top_words(request):
    sql = """
        SELECT *
        FROM gamedata_word
        ORDER BY frequency DESC
        LIMIT 8
    """
    res = [r for r in Word.objects.raw(sql)]
    for i in range(len(res)):
        res[i] = model_to_dict(res[i], fields=[field.name for field in res[i]._meta.fields])
    return JsonResponse(res, safe=False)

def get_my_game_stats(request, pid):
    sql = """
        SELECT *
        FROM gamedata_player
        WHERE pid = %s
    """
    res = [r for r in Player.objects.raw(sql, [pid])]
    for i in range(len(res)):
        res[i] = model_to_dict(res[i], fields=[field.name for field in res[i]._meta.fields])
    return JsonResponse(res, safe=False)
