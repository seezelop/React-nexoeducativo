import React, { Component } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

class BajaCursoPreceptor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursos: [],
      cursoSeleccionado: '',
      loading: false,
      error: null,
      successMessage: null
    };
  }

  componentDidMount() {
    this.cargarCursos();
  }

  cargarCursos = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await api.get('/api/usuario/verCursoPreceptor', {
        withCredentials: true,
      });
      this.setState({ 
        cursos: response.data,
        loading: false 
      });
    } catch (error) {
      console.error('Error al cargar los cursos:', error);
      this.setState({ 
        error: 'Error al cargar los cursos. Por favor, intente nuevamente.',
        loading: false 
      });
    }
  };

  handleCursoChange = (event) => {
    this.setState({ 
      cursoSeleccionado: event.target.value,
      successMessage: null // Limpiar mensaje de éxito al cambiar selección
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { cursoSeleccionado } = this.state;
  
    if (!cursoSeleccionado) {
      this.setState({ error: 'Por favor, seleccione un curso para eliminar.' });
      return;
    }
  
    const confirmar = window.confirm('¿Está seguro que desea eliminar este curso? Esta acción no se puede deshacer.');
  
    if (confirmar) {
      this.setState({ loading: true, error: null });
      try {
        await api.delete(`/api/usuario/borrarCurso/${cursoSeleccionado}`, {
          withCredentials: true,
        });
        
        await this.cargarCursos();
        
        this.setState({ 
          cursoSeleccionado: '',
          successMessage: 'Curso eliminado con éxito.',
          loading: false
        });
      } catch (error) {
        console.error('Error al eliminar el curso:', error);
        let errorMessage = 'Error al eliminar el curso. Por favor, intente nuevamente.';
        
        if (error.response && error.response.data) {
          errorMessage = error.response.data.mensaje || error.response.data;
        }
        
        this.setState({ 
          error: errorMessage,
          loading: false 
        });
      }
    }
  }

  render() {
    const { cursos, cursoSeleccionado, loading, error, successMessage } = this.state;

    return (
      <div className="p-4 border rounded">
        <h3 className="mb-4">Eliminar Curso</h3>
        
        <Form onSubmit={this.handleSubmit}>
          {/* Mensajes de estado */}
          {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
          {successMessage && <Alert variant="success" className="mb-3">{successMessage}</Alert>}
          
          {/* Selector de cursos */}
          <Form.Group className="mb-3">
            <Form.Label>Seleccionar Curso:</Form.Label>
            {cursos.length === 0 ? (
              <div className="alert alert-info">
                No hay cursos disponibles para eliminar.
              </div>
            ) : (
              <>
                <Form.Select
                  value={cursoSeleccionado}
                  onChange={this.handleCursoChange}
                  required
                  disabled={loading}
                >
                  <option value="">Seleccione un curso</option>
                  {cursos.map((curso) => (
                    <option key={curso.idCurso} value={curso.idCurso}>
                      {curso.numero}° {curso.division}
                    </option>
                  ))}
                </Form.Select>
                <Form.Text className="text-muted">
                  {cursos.length} cursos disponibles
                </Form.Text>
              </>
            )}
          </Form.Group>

          {/* Botón de eliminar (solo visible si hay cursos) */}
          {cursos.length > 0 && (
            <Button 
              variant="danger" 
              type="submit" 
              disabled={loading || !cursoSeleccionado}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {' Eliminando...'}
                </>
              ) : 'Eliminar Curso'}
            </Button>
          )}
        </Form>
      </div>
    );
  }
}

export default BajaCursoPreceptor;