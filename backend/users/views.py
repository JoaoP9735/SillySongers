from rest_framework import generics, status, permissions  # Adicione permissions aqui
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import CustomUser
from .serializers import UserSerializer

class UserCreateView(generics.CreateAPIView):
    """
    View para criar um novo usuário.
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class UserListView(generics.ListAPIView):
    """
    View para listar todos os usuários.
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserDetailView(generics.RetrieveAPIView):
    """
    View para recuperar um usuário específico por ID.
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['POST'])
def login_user(request):
    """
    View para fazer login do usuário.
    """
    email = request.data.get('email')
    password = request.data.get('password')
    
    if email and password:
        user = authenticate(username=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.id,
                'email': user.email,
                'nome': user.nome
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'Credenciais inválidas'
            }, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({
            'error': 'Email e senha são obrigatórios'
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user_by_email(request, email):
    """
    Busca usuário por email.
    """
    try:
        user = CustomUser.objects.get(email=email)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except CustomUser.DoesNotExist:
        return Response({'error': 'Usuário não encontrado'}, status=404)