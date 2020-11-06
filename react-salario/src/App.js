import React, { Component } from "react";
import { calculateSalaryFrom } from "./helpers/salary";
import ReadOnlyInput from "./components/ReadOnlyInput";
import css from "./components/style.module.css";

import Bar from "./components/Bar";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: null,

      salary: {
        baseINSS: 0,
        discountINSS: 0,
        baseIRPF: 0,
        discountIRPF: 0,
        newSalary: 0,
        disINSS100: null,
        disIRPF100: null,
        newSalary100: 0,
      },
    };
  }

  componentDidUpdate(_, previousState) {
    const { fullSalary: oldSalary } = previousState;
    const { fullSalary: newSalary } = this.state;    

    if (oldSalary !== newSalary) {
      const salary = calculateSalaryFrom(this.state.fullSalary);
      this.setState({ salary });
    }
  }

  handleInputChange = (event) => {
    const newSalary = Number(event.target.value);
    this.setState({ fullSalary: newSalary });
  };

  render() {
    const { fullSalary, salary} = this.state;
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      newSalary,
      disINSS100,
      disIRPF100,
      newSalary100,
    } = salary;
    //const simbol = "%"
    // const {descINSS100} = porcentagens;
    return (
      <div className={`${css.corpo}`}>
        <h3 className={`${css.texto}`}>React Salário</h3>
        <label>
          <span>Salário Bruto: </span>
          <input
            type="number"
            
            min="0"

            step="75"

            value={fullSalary}
            onChange={this.handleInputChange}
          />
        </label>

        <br />

        <ReadOnlyInput description="Base INSS" value={baseINSS.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
        <ReadOnlyInput
          description="Desconto INSS"
          value={discountINSS.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          simbol2="(" percentage={disINSS100} simbol=")%" 
        />
        <ReadOnlyInput description="Base IRPF" value={baseIRPF.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
        <ReadOnlyInput
          description="Desconto IRPF"
          value={discountIRPF.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          simbol2="(" percentage={disIRPF100} simbol=")%" 
        />
        <ReadOnlyInput
          description="Salário Líquido"
          value={newSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })+" ("+newSalary100+"%)"}
          simbol2="(" percentage={newSalary100 } simbol=")%" 
        />
        <br />
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <Bar value={disINSS100} color=" #e67e22" />
          <Bar value={disIRPF100} color="#c0392b" />
          <Bar value={newSalary100} color=" #16a085" />
        </div>
      </div>
    );
  }
}
