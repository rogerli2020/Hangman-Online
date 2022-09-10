from rest_framework import routers
from gamedata.viewsets import GameViewSet, RoundViewSet, WordViewSet, PlayerViewSet
router = routers.SimpleRouter()
router.register(r'game', GameViewSet, basename='game')
router.register(r'round', RoundViewSet, basename='round')
router.register(r'word', WordViewSet, basename='word')
router.register(r'player', PlayerViewSet, basename='player')