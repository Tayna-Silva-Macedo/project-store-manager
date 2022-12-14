const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const { salesModel } = require("../../../src/models");

const { returnSucessGet, returnSucessGetById } = require("../mocks/sales.mock");

describe("Testes de unidade da camada model de vendas", function () {
  describe("Testando rota POST", function () {
    afterEach(sinon.restore);

    it("Testa se é possível cadastrar uma venda com sucesso", async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: 7 }]);

      const result = await salesModel.insertSalesProducts([
        {
          productId: 1,
          quantity: 5,
        },
        {
          productId: 2,
          quantity: 4,
        },
      ]);

      expect(result).to.be.equal(7);
    });
  });

  describe("Testando rotas GET", function () {
    afterEach(sinon.restore);

    it("Testa se é possível listar todas as vendas", async function () {
      sinon.stub(connection, "execute").resolves([returnSucessGet]);

      const result = await salesModel.getAll();

      expect(result).to.be.deep.equal(returnSucessGet);
    });

    it("Testa se é possível listar uma venda pelo seu id", async function () {
      sinon.stub(connection, "execute").resolves([returnSucessGetById]);

      const result = await salesModel.getById(1);

      expect(result).to.be.deep.equal(returnSucessGetById);
    });

    it("Testa se ao procurar por um id que não existe é retornado um array vazio", async function () {
      sinon.stub(connection, "execute").resolves([[]]);

      const result = await salesModel.getById(99);

      expect(result).to.be.deep.equal([]);
    });
  });

  describe("Testando rota DELETE", function () {
    afterEach(sinon.restore);

    it("Testa se não é possível deletar uma venda que não existe", async function () {
      sinon.stub(connection, "execute").resolves([{ affectedRows: 0 }]);

      const result = await salesModel.destroy(99);

      expect(result).to.be.equal(0);
    });

    it("Testa se é possível deletar uma venda com sucesso", async function () {
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const result = await salesModel.destroy(1);

      expect(result).to.be.equal(1);
    });
  });

  describe("Testando rota PUT", function () {
    afterEach(sinon.restore);

    it("Testa se é possível alterar uma venda com sucesso", async function () {
      sinon.stub(connection, "execute").resolves();

      const result = await salesModel.update([
        {
          productId: 1,
          quantity: 10,
        },
        {
          productId: 2,
          quantity: 50,
        },
      ], 1);

      expect(result).to.be.equal(true);
    });
  });
});
