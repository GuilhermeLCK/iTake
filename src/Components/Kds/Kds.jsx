import { React, useState, useEffect } from "react";
import {
  FaAnglesRight,
  FaCaretRight,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa6";
import "./styleKds.scss";

function Kds({
  indexCard,
  title,
  quantidadeDePedidos,
  pedidosArray,
  enumSituacao,
  moverPedido,
}) {
  const [tempoRestante, setTempoRestante] = useState(null);

  useEffect(() => {
    // Quando pedidosArray ou enumSituacao mudarem, resetar o tempo restante
    setTempoRestante(null);
  }, [pedidosArray, enumSituacao]);

  useEffect(() => {
    // Inicializar o contador de tempo quando pedidosArray for definido
    if (pedidosArray && pedidosArray.length > 0) {
      const pedido = pedidosArray.find(
        (pedido) => pedido.SituacaoPedido === enumSituacao
      );

      if (pedido) {
        const tempoEstimadoSegundos = pedido.TempoEstimado * 60; // Converter minutos para segundos
        setTempoRestante(tempoEstimadoSegundos);

        const interval = setInterval(() => {
          setTempoRestante((prevTempo) => {
            if (prevTempo === 0) {
              clearInterval(interval);
              // Lógica adicional ao atingir o tempo zero, se necessário
            }
            return prevTempo - 1;
          });
        }, 1000); // 1000 ms = 1 segundo
        return () => clearInterval(interval);
      }
    }
  }, [pedidosArray, enumSituacao]);

  // Função para formatar o tempo de segundos para mm:ss
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  };

  return (
    <>
      <div className="container-iTake-pedidos-card">
        <div className="container-iTake-pedidos-card-title-fixed">
          <h2>{title}</h2>
          <h2>{pedidosArray.length}</h2>
        </div>

        <div className="container-iTake-pedidos-card-maps">
          {pedidosArray
            ?.filter((pedido) => pedido.SituacaoPedido === enumSituacao)
            ?.sort((a, b) => a.Codigo - b.Codigo)
            .map((pedido, index) => (
              <div
                key={index}
                id={`color${indexCard + 1}`}
                className="container-iTake-pedidos-card-maps-section"
              >
                <div className="container-iTake-pedidos-card-maps-section-modalidade">
                  <h2>
                    {pedido.ModalidadeNome} <FaCaretRight /> {pedido.Codigo}
                  </h2>
                  <h2>#{pedido.Identificador}</h2>
                </div>
                <div className="container-iTake-pedidos-card-maps-section-title">
                  <h2>Pedido #{pedido.Codigo}</h2>

                  {/* {tempoRestante !== null && (
                    <h2>Temp Rest: {formatTime(tempoRestante)}</h2>
                  )} */}
                  <h2>Temp Rest: {pedido.TempoEstimado}min</h2>
                </div>

                <div className="container-iTake-pedidos-card-maps-section-produto">
                  <h2>
                    <FaAnglesRight size={16} /> {pedido.Qtde}x {pedido.ItemNome}
                  </h2>

                  {pedido.Itens &&
                    pedido.Itens.map((item, itemIndex) => (
                      <h2 key={itemIndex}>
                        <FaAnglesRight size={16} /> {item.Quantidade}x{" "}
                        {item.Nome}
                      </h2>
                    ))}
                </div>

                <div className="container-iTake-pedidos-card-maps-section-button">
                  {indexCard === 1 && (
                    <button
                      onClick={() =>
                        moverPedido(pedido.Codigo, pedido.SituacaoPedido - 1)
                      }
                    >
                      <FaArrowLeft size={18} />
                      RETORNAR
                    </button>
                  )}

                  {indexCard === 2 && (
                    <button
                      onClick={() =>
                        moverPedido(pedido.Codigo, pedido.SituacaoPedido - 1)
                      }
                    >
                      <FaArrowLeft size={18} />
                      RETORNAR
                    </button>
                  )}

                  {indexCard !== 3 && (
                    <button
                      onClick={() =>
                        moverPedido(pedido.Codigo, pedido.SituacaoPedido + 1)
                      }
                    >
                      AVANÇAR <FaArrowRight size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Kds;
