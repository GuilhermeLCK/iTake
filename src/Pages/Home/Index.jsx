import React, { useState } from "react";
import data from "../../Services/Produtos";
import "./styleHome.scss";
import Logo from "../../assets/new-logo-light.png";

function Index() {
  const [pedidos, setPedidos] = useState(data);

  const moverPedido = (Codigo, novoStatus) => {
    setPedidos(
      pedidos.map((pedido) => {
        if (pedido.Codigo === Codigo) {
          return { ...pedido, SituacaoPedido: novoStatus };
        }
        return pedido;
      })
    );
  };

  return (
    <>
      <div className="container-iTake-home">
        <header className="container-iTake-header">
          <div className="container-iTake-header-informacoes">
            <div className="container-iTake-header-informacoes-img">
              <img src={Logo} alt="Logo IzzyWay" />
            </div>
            <div className="container-iTake-header-informacoes-text">
              <h3>iTake</h3>
            </div>
          </div>
          <div className="container-iTake-header-logout">
            <h3>Sair</h3>
          </div>
        </header>

        <div className="container-iTake-pedidos">
          <div className="container-iTake-pedidos-card" id="color1">
            <div className="container-iTake-pedidos-card-title-fixed">
              <h2>Pedidos</h2>
              <h2>{pedidos.length}</h2>
            </div>

            <div className="container-iTake-pedidos-card-maps">
              {pedidos
                ?.filter((pedido) => pedido.SituacaoPedido === 1)
                ?.map((pedido, index) => (
                  <div
                    key={index}
                    className="container-iTake-pedidos-card-maps-section"
                  >
                    <div>
                      <h2>Pedido #{pedido.Codigo}</h2>
                      <h2>{pedido.EmissaoFormatado}</h2>
                    </div>
                    <div>
                      <h2>
                        {pedido.Qtde}x {pedido.ItemNome}
                      </h2>
                    </div>

                    <button onClick={() => moverPedido(pedido.Codigo, 2)}>
                      Avançar
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className="container-iTake-pedidos-card" id="color2">
            <div className="container-iTake-pedidos-card-title-fixed">
              <h2>Em Produção</h2>
              <h2>{pedidos.length}</h2>
            </div>

            {pedidos
              .filter((pedido) => pedido.SituacaoPedido === 2)
              .map((pedido, index) => (
                <li key={index}>
                  {pedido.ItemNome}
                  <button onClick={() => moverPedido(pedido.Codigo, 3)}>
                    Avançar
                  </button>
                  <button onClick={() => moverPedido(pedido.Codigo, 1)}>
                    Retornar
                  </button>
                </li>
              ))}
          </div>
          <div className="container-iTake-pedidos-card" id="color3">
            <div className="container-iTake-pedidos-card-title-fixed">
              <h2>Finalizados</h2>
              <h2>{pedidos.length}</h2>
            </div>

            {pedidos
              .filter((pedido) => pedido.SituacaoPedido === 3)
              .map((pedido, index) => (
                <li key={index}>
                  {pedido.ItemNome}

                  <button onClick={() => moverPedido(pedido.Codigo, 2)}>
                    Retornar
                  </button>
                  <button onClick={() => moverPedido(pedido.Codigo, 4)}>
                    Avançar
                  </button>
                </li>
              ))}
          </div>

          <div className="container-iTake-pedidos-card" id="color4">
            <div className="container-iTake-pedidos-card-title-fixed">
              <h2>Ultimos</h2>
              <h2>{pedidos.length}</h2>
            </div>

            {pedidos
              .filter((pedido) => pedido.SituacaoPedido === 4)
              .map((pedido, index) => (
                <li key={index}>
                  {pedido.ItemNome}
                  <button onClick={() => moverPedido(pedido.Codigo, 3)}>
                    Retornar
                  </button>
                </li>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
