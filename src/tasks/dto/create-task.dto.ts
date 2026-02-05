import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/* 
DTO - Data Transfer Object (Objeto de Transferência de Dados)
- É um objeto que contém os dados que serão enviados para o servidor
- É usado para validar os dados enviados pelo cliente
- É usado para proteger os dados do servidor
- É usado para padronizar os dados enviados pelo cliente
- É usado para padronizar os dados recebidos pelo servidor
- É usado para padronizar os dados enviados pelo cliente
*/
export class CreateTaskDto {
  @IsString({ message: 'O nome da tarefa deve ser uma string' })
  @MinLength(5)
  @IsNotEmpty({ message: 'O nome da tarefa é obrigatório' })
  readonly name: string;

  @IsString({ message: 'A descrição da tarefa deve ser uma string' })
  @MinLength(5)
  @IsNotEmpty({ message: 'A descrição da tarefa é obrigatória' })
  readonly description: string;
}
