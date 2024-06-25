using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(
    options =>
    {
        options.AddPolicy("AcessoTotal",
            builder => builder.
                AllowAnyOrigin().
                AllowAnyHeader().
                AllowAnyMethod());
    }
);

var app = builder.Build();



app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5000/categoria/listar
app.MapGet("/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5000/categoria/cadastrar
app.MapPost("/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5000/tarefas/listar
app.MapGet("/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.Include(t => t.Categoria).ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5000/tarefas/cadastrar
app.MapPost("/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

//PUT: http://localhost:5000/tarefas/alterar/{id}
app.MapPut("/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    Tarefa? tarefa = ctx.Tarefas.FirstOrDefault(t => t.TarefaId.ToString() == id.ToString());
    if (tarefa == null)
    {
        return Results.NotFound("Tarefa não encontrada");
    }
    else if (tarefa.Status == "Concluído")
    {
        return Results.BadRequest("Tarefa ja esta concluida");
    }

    tarefa.Status = tarefa.Status == "Não iniciada" ? "Em andamento" : "Concluído";

    ctx.Tarefas.Update(tarefa);
    ctx.SaveChanges();

    return Results.Ok($"Status alterado para {tarefa.Status}!");
});


//GET: http://localhost:5000/tarefas/naoconcluidas
app.MapGet("/tarefas/listar-nao-concluidas", ([FromServices] AppDataContext ctx) =>
{
    List<Tarefa> tarefas = new List<Tarefa>();

    foreach (Tarefa t in ctx.Tarefas)
    {
        if (t.Status == "Não iniciada" || t.Status == "Em andamento")
            tarefas.Add(t);
    }

    if (tarefas.Any())
        return Results.Ok(tarefas);

    return Results.NotFound("Sem tarefas em andamento!");
});

//GET: http://localhost:5000/tarefas/concluidas
app.MapGet("/tarefas/listar-concluidas", ([FromServices] AppDataContext ctx) =>
{
    List<Tarefa> tarefas = new List<Tarefa>();

    foreach (Tarefa t in ctx.Tarefas)
    {
        if (t.Status == "Concluído")
            tarefas.Add(t);
    }

    if (tarefas.Any())
        return Results.Ok(tarefas);

    return Results.NotFound("Sem tarefas concluidas!");
});

app.UseCors("AcessoTotal");

app.Run();
