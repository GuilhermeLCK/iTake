import React, { useState } from "react";
import data from "../../Services/Produtos";
import "./styleHome.scss";
import Logo from "../../assets/new-logo-light.png";
import Kds from "../../Components/Kds/Kds";
import { FaAnglesRight } from "react-icons/fa6";

function Index() {
  const situacoes = [
    "Pendentes",
    "Em produção",
    "Finalizados",
    "Ultimos pedidos",
  ];
  const [pedidos, setPedidos] = useState(data);
  const [inputValue, setInputValue] = useState("");

  const moverPedido = (Codigo, novoStatus) => {
    setPedidos(
      pedidos.map((pedido) => {
        if (pedido.Codigo === Codigo) {
          console.log(pedido);
          return { ...pedido, SituacaoPedido: novoStatus };
        }
        return pedido;
      })
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      var valueDigitado = e.target.value;
      if (valueDigitado.includes("++")) {
        const code = valueDigitado.replace("++", "");
        const matchedPedidos = pedidos.filter((p) => p.Identificador == code);

        console.log(matchedPedidos);
        if (matchedPedidos[0].SituacaoPedido == 4) {
          return alert("Movimento ja encerrado");
        }

        moverPedido(
          matchedPedidos[0].Codigo,
          matchedPedidos[0].SituacaoPedido + 1
        );
        //  setInputValue("");
      } else {
        const code = valueDigitado.replace("--", "");
        const matchedPedidos = pedidos.filter((p) => p.Identificador == code);
        if (matchedPedidos[0].SituacaoPedido == 1) {
          return alert("Movimento não pode ficar negativo");
        }

        moverPedido(
          matchedPedidos[0].Codigo,
          matchedPedidos[0].SituacaoPedido - 1
        );
      }
    }
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
          <div>
            <input
              type="text"
              value={inputValue}
              onKeyPress={handleKeyPress}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
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
