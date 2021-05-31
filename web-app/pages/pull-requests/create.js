import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from "next/link";
import Container from "../../components/Container";
import SuccessMessage from "../../components/SuccessMessage";
import ErrorMessage from "../../components/ErrorMessage";

export default function CreatePR({branches}) {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessMR, setShowSuccessMR] = useState(false);
  const [pullNumber, setPullNumber] = useState(0);
  const { register, handleSubmit, formState: {errors} } = useForm();

  const onSubmit = async data => {
    const res = await fetch(
      'http://localhost:8000/api/v1/pull-requests',
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    );
    const result = await res.json();
    if (result['success']) {      
      setShowError(false);
      setShowSuccess(true);
      setPullNumber(result['number']);
      console.log('Pull Number',pullNumber);
    } else {
      setShowError(true);
    }
  }

  const handleMergePR = async () => {
    const res = await fetch(
      `http://localhost:8000/api/v1/pull-requests/${pullNumber}/merge`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      }
    );
    const result = await res.json();
    console.log(result);
    if (result && result['merged']) {
      setShowError(false);
      setShowSuccess(false);
      setShowSuccessMR(true);
    } else {
      setShowError(true);
    }
  }

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-6 p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex-auto flex flex-col md:col-start-2 md:col-span-4 lg:col-start-2 lg:col-span-3">
          <div className="w-full px-3 mb-3">
            <label htmlFor="title" 
                    className="tracking-wide text-black text-xs font-bold mb-2">Título *</label>
            <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" 
                    id="title" 
                    name="title"
                    {...register("title", {required:true})}
                    type="text" 
                    placeholder=""/>
            {
              errors.title && 
              <ErrorMessage>
                {errors.title.type === 'required' && 'El título es requerido'}
              </ErrorMessage> 
            }
          </div>
          <div className="w-full px-3 mb-3">
            <label htmlFor="body" 
                    className="tracking-wide text-black text-xs font-bold mb-2">Descripción *</label>
            <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" 
                    id="body"
                    name="body"
                    {...register("body", {required:true})}
                    type="text"/>
            {
              errors.body && 
              <ErrorMessage>
                {errors.body.type === 'required' && 'La descripción es requerida'}
              </ErrorMessage> 
            }
          </div>
          
          <div className="w-full px-3 mb-3">
            <label htmlFor="head" 
                    className="tracking-wide text-black text-xs font-bold mb-2">¿Qué branch tiene tus cambios para el merge? *</label>
            <div className="relative mb-3">
              <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none" 
                      id="head"
                      name="head"
                      defaultValue=""
                      {...register("head", {required:true})}>
                <option value="" disabled>Selecciona</option>
                {
                  branches.map(branch => (
                    <option key={`${branch.name}-1`} value={`${branch.name}`}>{branch.name}</option>    
                  ))
                }
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            {
              errors.head && 
              <ErrorMessage>
                {errors.head.type === 'required' && 'Debes seleccionar la branch head'}
              </ErrorMessage> 
            }
          </div>
          <div className="w-full px-3 mb-3">
            <label htmlFor="base" 
                    className="tracking-wide text-black text-xs font-bold mb-2">¿A qué branch quieres hacer merge? *</label>
            <div className="relative mb-3">
              <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none" 
                      id="base"
                      name="base"
                      defaultValue=""
                      {...register("base", {required:true})}>
                <option value="" disabled>Selecciona</option>
                {
                  branches.map(branch => (
                    <option key={`${branch.name}-2`} value={`${branch.name}`}>{branch.name}</option>    
                  ))
                }
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            {
              errors.base && 
              <ErrorMessage>
                {errors.base.type === 'required' && 'Debes seleccionar la branch base'}
              </ErrorMessage> 
            }
          </div>
          <div className="w-full px-3 mb-3">
            <button type="submit"
                    className="bg-white rounded-sm text-gray border-gray border hover:bg-green-600 hover:border-green-600 hover:text-white py-2 my-2 w-full">
                      Crear Pull Requests
            </button>
          </div>
          {
            showError ?
            <div className="w-full px-3 mb-3">
              <ErrorMessage>Verifique que los datos sean correctos</ErrorMessage>
            </div> :
            <></>
          }
          {
            showSuccess ?
            <div className="w-full px-3 mb-3">
              <SuccessMessage>
                El Pull Requests ha sido creado exitosamente. &nbsp;
                <button onClick={() => handleMergePR} className="text-green-900 underline">
                  Haga click aquí para realizar el merge
                </button>
              </SuccessMessage>
            </div> :
            <></>
          }
          {
            showSuccessMR ?
            <div className="w-full px-3 mb-3">
              <SuccessMessage>
                El Pull Requests se ha realizado exitosamente.
              </SuccessMessage>
            </div> :
            <></>
          }
        </form>
      </div>
    </Container>
  );

}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.HOST}${process.env.VERSION}${process.env.BRANCHES}`);
  const branches = await response.json();
  return {
    props: {
      branches
    }
  }
}