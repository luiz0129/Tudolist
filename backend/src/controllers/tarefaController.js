import Tarefa from "../models/tarefaModel.js";
import { z } from "zod";

const createSchema = z.object({
     tarefa: z.string({
          invalid_type_error: "A tarefa deve ser um texto",
          required_error: "Tarefa é obrigatória"
     })
          .min(3, { message: "a tarefa deve conter pelo menos 3 caracteres" })
          .max(255, { message: "a tarefa deve conter no máximo 255 caracteres" }),
     descricao: z.string().min(5, { message: "a tarefa deve conter pelo menos 5 caracteres" }).nullable(),
})

export const create = async (req, res) => {

     const createValidation = createSchema.safeParse(req.body);
     if (!createValidation.success) {
          res.status(400).json(createValidation.error)
          return
     }
     const { tarefa, descricao } = createValidation.data;

     const novaTarefa = {
          tarefa,
          descricao
     }

     try {
          const insertTarefa = await Tarefa.create(novaTarefa)
          res.status(201).json(insertTarefa)
     } catch (error) {
          console.error(error)
          res.status(500).json({ err: "Erro ao cadastrar tarefa" })
     }
};

export const getAll = async (req, res) => {
     try {
          const tafefas = await Tarefa.findAll()
          res.status(200).json(tafefas)
     } catch (error) {
          console.error(error)
          res.status(500).json({ err: "deu erro buscando moral" })
     }
     res.status(200).json("Chegou no controlador")
};

export const getTarefa = async (req, res) => {
const {id} = req. params

     const tarefa = await Tarefa.findByPk(id);
     if (tarefa === null) {
          console.log('Not found!');
     } else {
          console.log(tarefa instanceof Tarefa); // true
     res.status(200).json(tarefa)  
     }
};

export const updateTarefa = async (req, res) => {
     res.status(200).json("Chegou no controlador")
};

export const updateStatusTarefa = async (req, res) => {
     res.status(200).json("Chegou no controlador")
};

export const getTarefaStatus = async (req, res) => {
     res.status(200).json("Chegou no controlador")
};

export const deleteTarefa = async (req, res) => {
     res.status(200).json("Chegou no controlador")
};
