using System;
using MySql.Data.MySqlClient;

class Program
{
    static string conexao = "server=localhost;database=escola;user=root;password=SUA_SENHA;";

    static void Main()
    {
        int opcao = -1;

        while (opcao != 0)
        {
            Console.WriteLine();
            Console.WriteLine("===== CADASTRO DE ALUNOS =====");
            Console.WriteLine("1 - Cadastrar aluno");
            Console.WriteLine("2 - Listar alunos");
            Console.WriteLine("3 - Editar aluno");
            Console.WriteLine("4 - Excluir aluno");
            Console.WriteLine("0 - Sair");
            Console.Write("Escolha uma opcao: ");

            opcao = LerNumero();

            if (opcao == 1)
            {
                Cadastrar();
            }
            else if (opcao == 2)
            {
                Listar();
            }
            else if (opcao == 3)
            {
                Editar();
            }
            else if (opcao == 4)
            {
                Excluir();
            }
            else if (opcao == 0)
            {
                Console.WriteLine("Saindo...");
            }
            else
            {
                Console.WriteLine("Opcao invalida!");
            }
        }
    }

    static int LerNumero()
    {
        string texto = Console.ReadLine();
        int numero;

        if (int.TryParse(texto, out numero))
        {
            return numero;
        }

        return -1;
    }

    static void Cadastrar()
    {
        Console.Write("Nome: ");
        string nome = Console.ReadLine();

        Console.Write("Idade: ");
        int idade = LerNumero();

        Console.Write("Curso: ");
        string curso = Console.ReadLine();

        MySqlConnection con = new MySqlConnection(conexao);
        con.Open();

        string sql = "INSERT INTO alunos (nome, idade, curso) VALUES (@nome, @idade, @curso)";
        MySqlCommand cmd = new MySqlCommand(sql, con);
        cmd.Parameters.AddWithValue("@nome", nome);
        cmd.Parameters.AddWithValue("@idade", idade);
        cmd.Parameters.AddWithValue("@curso", curso);
        cmd.ExecuteNonQuery();

        con.Close();

        Console.WriteLine("Aluno cadastrado com sucesso!");
    }

    static void Listar()
    {
        MySqlConnection con = new MySqlConnection(conexao);
        con.Open();

        string sql = "SELECT id, nome, idade, curso FROM alunos";
        MySqlCommand cmd = new MySqlCommand(sql, con);
        MySqlDataReader leitor = cmd.ExecuteReader();

        Console.WriteLine();
        Console.WriteLine("ID | NOME | IDADE | CURSO");
        Console.WriteLine("--------------------------");

        int total = 0;

        while (leitor.Read())
        {
            int id = leitor.GetInt32("id");
            string nome = leitor.GetString("nome");
            int idade = leitor.GetInt32("idade");
            string curso = leitor.GetString("curso");

            Console.WriteLine(id + " | " + nome + " | " + idade + " | " + curso);
            total++;
        }

        if (total == 0)
        {
            Console.WriteLine("Nenhum aluno cadastrado.");
        }

        leitor.Close();
        con.Close();
    }

    static void Editar()
    {
        Listar();

        Console.Write("Digite o ID do aluno que deseja editar: ");
        int id = LerNumero();

        Console.Write("Novo nome: ");
        string nome = Console.ReadLine();

        Console.Write("Nova idade: ");
        int idade = LerNumero();

        Console.Write("Novo curso: ");
        string curso = Console.ReadLine();

        MySqlConnection con = new MySqlConnection(conexao);
        con.Open();

        string sql = "UPDATE alunos SET nome = @nome, idade = @idade, curso = @curso WHERE id = @id";
        MySqlCommand cmd = new MySqlCommand(sql, con);
        cmd.Parameters.AddWithValue("@nome", nome);
        cmd.Parameters.AddWithValue("@idade", idade);
        cmd.Parameters.AddWithValue("@curso", curso);
        cmd.Parameters.AddWithValue("@id", id);
        int linhas = cmd.ExecuteNonQuery();

        con.Close();

        if (linhas > 0)
        {
            Console.WriteLine("Aluno atualizado!");
        }
        else
        {
            Console.WriteLine("Nenhum aluno encontrado com esse ID.");
        }
    }

    static void Excluir()
    {
        Listar();

        Console.Write("Digite o ID do aluno que deseja excluir: ");
        int id = LerNumero();

        Console.Write("Tem certeza? (s/n): ");
        string resposta = Console.ReadLine();

        if (resposta != "s")
        {
            Console.WriteLine("Exclusao cancelada.");
            return;
        }

        MySqlConnection con = new MySqlConnection(conexao);
        con.Open();

        string sql = "DELETE FROM alunos WHERE id = @id";
        MySqlCommand cmd = new MySqlCommand(sql, con);
        cmd.Parameters.AddWithValue("@id", id);
        int linhas = cmd.ExecuteNonQuery();

        con.Close();

        if (linhas > 0)
        {
            Console.WriteLine("Aluno excluido!");
        }
        else
        {
            Console.WriteLine("Nenhum aluno encontrado com esse ID.");
        }
    }
}
