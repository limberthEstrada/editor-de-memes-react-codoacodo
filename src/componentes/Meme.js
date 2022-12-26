import html2canvas from 'html2canvas';
import Canvas2Image from 'canvas2image';
import React, {useState, useEffect, useRef} from 'react';

const Memazo = ()=>{

    const selectRef = useRef();
    const contenedorText = useRef();
    const [imgmeme, setImgmeme] = useState([]);
    const [textmeme, setTextmeme] = useState();
    const [imgmemeSeleccionada, setImgmemeSeleccionada] = useState([]);
    
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(data => data.json())
            .then(json => setImgmeme(json.data.memes));   
    }, []);

    console.log(imgmeme)

    const seleccionarImg = (e) => {
        setImgmemeSeleccionada(imgmeme.filter(img => img.id==e.target.value));
        console.log("Aqui xd")
        console.log("@test")
        console.log(selectRef.current)
        console.log(imgmemeSeleccionada)
    }

    const cambiarEstilos = (e) => {
        document.querySelector(".text-center").classList.add("text-center2");
        document.querySelector(".contenedor-opciones").style.width="50%"
        document.querySelector(".contenedor-imagen").style.width="50%"
        
    }

    const textomeme = (e) => {
        setTextmeme(e.target.value);
        console.log(e.target.value);
    }

 


    const Descargar = (e) => {
        html2canvas(document.querySelector("#exportar"), { allowTaint: true, useCORS: true, logging: true }).then(function(canvas) {
            console.log("Estamosssss")
            console.log(canvas)
            let img = canvas.toDataURL("memes/jpg");
            let link = document.createElement("a");
            link.download = "memepropio.jpg";
            link.href = img;
            link.click();
        });
    }


        
    return(
        <div className='text-center' ref={contenedorText}>
            <div className='contenedor-opciones'>
            <h1 className='mt-3 mb-3 text-center'>Editá tu propio meme</h1>

            <h3 className='mt-3 mb-3 text-center'>Elegí tu imagen</h3>
            <select onClick={seleccionarImg} ref={selectRef} onChange={cambiarEstilos} className='form-select form-select-lg mb-3 w-50 m-auto' arial-label=".form-select-lg example" >
            <option value="0">Selecciona una opción</option>
                {
                    imgmeme.map((img, i)=> (
                        <option key={img+i} value={img.id}>{img.name}</option>
                    ))
                }
            </select>
            
            <h3 className='mt-3 mb-3 text-center'>Ingrese el texto del meme</h3>
            <input onChange={textomeme} className='form-control w-50 m-50 m-auto d-block' type="text" placeholder="Pone tu frase" name="meme" arial-label="default input example" ></input>

            <button onClick={Descargar} id='hola' type="button" className='btn btn-primary mt-4 mb-4'>Descargar meme</button>

            </div>    
            
            <div className='contenedor-imagen'>
            <figure className="text-center" id="exportar">
                <p className="w-100 px-30 start-30  h1 text-center textomeme">{textmeme} </p>
                { imgmemeSeleccionada.length > 0 &&
                    <img src={imgmemeSeleccionada[0].url} className="figure-img mt-3 d-block m-auto" alt="meme" />
                }
            </figure>
            </div>
        </div>
    );

}

export default Memazo;
