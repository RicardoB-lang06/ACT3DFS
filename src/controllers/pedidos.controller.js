const pedidoRepository = require('../repositories/pedidos.repository');

class PedidoController {
    
    getAll(req, res) {
        const pedidos = pedidoRepository.getAll();
        res.json(pedidos);
    }

    getById(req, res) {
        const pedido = pedidoRepository.getById(req.params.id);
        if (!pedido){
        return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.json(pedido);
    }

    create(req, res) {
        const { producto, cantidad } = req.body;

        if (!producto || cantidad <= 0) {
            return res.status(400).json({ error: "El producto es requerido y la cantidad debe ser mayor a 0" });
        }

        const nuevoPedido = pedidoRepository.create({ producto, cantidad });
        res.status(201).json(nuevoPedido);
    }

    update(req, res) {
        const { id } = req.params;
        const { nuevoEstado } = req.body;
        const pedidoExistente = pedidoRepository.getById(id);

        if (!pedidoExistente) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        if (pedidoExistente.estado !== "pendiente") {
            return res.status(400).json({ 
                error: `No se puede modificar un pedido en estado '${pedidoExistente.estado}'` 
            });
        }

        const estadosValidos = ["confirmado", "cancelado"];
        if (!estadosValidos.includes(nuevoEstado)) {
            return res.status(400).json({ error: "Estado inválido. Solo se permite 'confirmado' o 'cancelado'" });
        }

        const pedidoActualizado = pedidoRepository.update(id, { estado: nuevoEstado });
        res.json(pedidoActualizado);
    }

    remove(req, res) {
        const { id } = req.params;
        const pedidoExistente = pedidoRepository.getById(id);

        if (!pedidoExistente) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        if (pedidoExistente.estado !== "pendiente") {
            return res.status(400).json({ 
                error: "Solo se pueden eliminar pedidos que aún estén en estado 'pendiente'" 
            });
        }

        pedidoRepository.delete(id);
        res.json({ mensaje: "Pedido eliminado correctamente" });
    }
}

module.exports = new PedidoController();