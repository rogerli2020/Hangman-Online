from rest_framework import viewsets
from gamedata.models import *
from gamedata.serializers import *

class GameViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer

    def get_queryset(self):
        return Game.objects.all()

class RoundViewSet(viewsets.ModelViewSet):
    serializer_class = RoundSerializer
    
    def get_queryset(self):
        return Round.objects.all()

class WordViewSet(viewsets.ModelViewSet):
    serializer_class = WordSerializer

    def get_queryset(self):
        return Word.objects.all()

class PlayerViewSet(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    
    def get_queryset(self):
        return Player.objects.all()