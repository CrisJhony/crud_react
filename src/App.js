import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  {   id_usuario: "1", nombre_usuario: "Jhony", cedula_usuario: "1722207709", teléfono_usuario: "0998356008", mail_usuario: "cristiandan1991dan@gmail.com"},
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id_usuario: "",
      nombre_usuario: "",
      cedula_usuario: "",
      teléfono_usuario: "",
      mail_usuario: ""
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id_usuario == registro.id_usuario) {
        arreglo[contador].nombre_usuario = dato.nombre_usuario;
        arreglo[contador].cedula_usuario = dato.cedula_usuario;
        arreglo[contador].teléfono_usuario = dato.teléfono_usuario;
        arreglo[contador].mail_usuario = dato.mail_usuario;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id_usuario);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id_usuario === registro.id_usuario) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id_usuario=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>Id Usuario</th>
                <th>Nombre Usuario</th>
                <th>Cedula Usuario</th>
                <th>Teléfono Usuario</th>
                <th>Mail Usuario</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id_usuario}>
                  <td>{dato.id_usuario}</td>
                  <td>{dato.nombre_usuario}</td>
                  <td>{dato.cedula_usuario}</td>
                  <td>{dato.teléfono_usuario}</td>
                  <td>{dato.mail_usuario}</td>
                  <td>
                    <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)}>Editar</Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id_usuario}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombres: 
              </label>
              <input
                className="form-control"
                name="nombre_usuario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre_usuario}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Cedula: 
              </label>
              <input
                className="form-control"
                name="cedula_usuario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.cedula_usuario}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Telefono: 
              </label>
              <input
                className="form-control"
                name="teléfono_usuario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.teléfono_usuario}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Correo: 
              </label>
              <input
                className="form-control"
                name="mail_usuario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.mail_usuario}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombres: 
              </label>
              <input
                className="form-control"
                name="nombre_usuario"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Cedula: 
              </label>
              <input
                className="form-control"
                name="cedula_usuario"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Telefono: 
              </label>
              <input
                className="form-control"
                name="teléfono_usuario"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Correo: 
              </label>
              <input
                className="form-control"
                name="mail_usuario"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
