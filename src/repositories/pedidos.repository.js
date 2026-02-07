class PedidoRepository {
    #pedidos;
    #currentId;

    constructor() {
        this.#pedidos = [];
        this.#currentId = 1;
    }

    getAll() {
        return [...this.#pedidos];
    }

    getById(id) {
        return this.#pedidos.find(pedido => pedido.id === Number(id));
    }

    create(data) {
        const nuevoPedido = {
            id: this.#currentId++,
            producto: data.producto,
            cantidad: data.cantidad,
            estado: "pendiente"
        };
        this.#pedidos.push(nuevoPedido);
        return nuevoPedido;
    }

    update(id, data) {
        const pedido = this.getById(id);
        if (pedido) {
            Object.assign(pedido, data);
            return pedido;
        }
        return null;
    }

    delete(id) {
        const index = this.#pedidos.findIndex(pedido => pedido.id === id);
        if (index !== -1) {
            return this.#pedidos.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = new PedidoRepository();