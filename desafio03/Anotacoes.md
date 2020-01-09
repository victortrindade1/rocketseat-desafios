Tenho que organizar o arquivo .env, colocar mais dados.

1. Checkins

Quando o aluno chega na academia o mesmo realiza um check-in apenas informando seu ID de cadastro (ID do banco de dados);

Esse check-in serve para monitorar quantas vezes o usuário frequentou a academia na semana.

A tabela de checkins possui os campos:

    student_id (referência ao aluno);
    created_at;
    updated_at;

O usuário só pode fazer 5 checkins dentro de um período de 7 dias corridos.

Exemplo de requisição: POST https://gympoint.com/students/3/checkins

Crie uma rota para listagem de todos checkins realizados por um usuário com base em seu ID de cadastro;

Exemplo de requisição: GET https://gympoint.com/students/3/checkins
