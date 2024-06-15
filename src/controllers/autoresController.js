import autores from "../models/autores.js";

class AutoresController {

  static listarAutores = async (req, res, next) => {
    try {
      const autorResultado = await autores.find()
        .populate("autor")
        .exec();

      res.status(200).json(autorResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findById(id)
        .populate("autor", "nome")
        .exec();

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        next(new NaoEncontrado("Id do autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
    
      const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});

      console.log(autorResultado);
    
      if (autorResultado !== null) {
        res.status(200).send({message: "Autor atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static deletarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autor.findByIdAndDelete(id);

      console.log(autorResultado);
      
      if (autorResultado !== null) {
        res.status(200).send({message: "Autor removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

}

export default AutoresController;