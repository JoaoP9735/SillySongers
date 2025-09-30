from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        # Estes são os campos que a sua API vai aceitar e retornar
        fields = ['id', 'nome', 'email', 'apelido', 'password']
        extra_kwargs = {
            'password': {'write_only': True}, # Garante que a senha não seja enviada de volta na resposta
            'id': {'read_only': True}
        }

    def create(self, validated_data):
        """
        Este método é a chave!
        Ele usa create_user para garantir que o usuário seja criado
        corretamente com o email como username e com a senha hasheada.
        """
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            nome=validated_data['nome'],
            apelido=validated_data.get('apelido'), # .get() para caso o apelido não seja enviado
            password=validated_data['password']
        )
        return user
    