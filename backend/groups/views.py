from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Group
from users.models import CustomUser
from .serializers import GroupSerializer, ManageUserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite aos grupos serem vistos ou editados.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated] # Apenas usuários autenticados podem interagir

    @action(detail=True, methods=['post'], serializer_class=ManageUserSerializer)
    def adicionar_usuario(self, request, pk=None):
        """Adiciona um usuário ao grupo."""
        grupo = self.get_object()
        serializer = ManageUserSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data['user_id']
            try:
                usuario = CustomUser.objects.get(id=user_id)
                grupo.usuarios.add(usuario)
                return Response({'status': 'usuário adicionado'}, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist:
                return Response({'error': 'Usuário não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], serializer_class=ManageUserSerializer)
    def remover_usuario(self, request, pk=None):
        """Remove um usuário do grupo."""
        grupo = self.get_object()
        serializer = ManageUserSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data['user_id']
            try:
                usuario = CustomUser.objects.get(id=user_id)
                grupo.usuarios.remove(usuario)
                return Response({'status': 'usuário removido'}, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist:
                return Response({'error': 'Usuário não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)