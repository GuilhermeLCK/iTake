import React, { useState } from "react";
import data from "../../Services/Produtos";
import "./styleHome.scss";
import Logo from "../../assets/new-logo-light.png";
import Kds from "../../Components/Kds/Kds";
import { FaAnglesRight } from "react-icons/fa6";

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

  const situacoes = [
    "Pendentes",
    "Em produção",
    "Finalizados",
    "Ultimos pedidos",
  ];
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
          {situacoes.map((title, index) => {
            return (
              <>
                <Kds
                  indexCard={index}
                  title={title}
                  quantidadeDePedidos={pedidos.length}
                  pedidosArray={pedidos}
                  enumSituacao={index + 1}
                  moverPedido={moverPedido}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Index;
