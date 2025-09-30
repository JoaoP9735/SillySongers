from rest_framework import serializers
from .models import Group
from users.serializers import UserSerializer

class GroupSerializer(serializers.ModelSerializer):
    # Serializer para listar usuários com menos detalhes
    usuarios = UserSerializer(many=True, read_only=True)
    quantidade_usuarios = serializers.IntegerField(read_only=True)

    class Meta:
        model = Group
        fields = ['id', 'nome', 'points', 'current_goal', 'usuarios', 'quantidade_usuarios']

class ManageUserSerializer(serializers.Serializer):
    # Serializer para receber o ID do usuário a ser adicionado/removido
    user_id = serializers.UUIDField()
