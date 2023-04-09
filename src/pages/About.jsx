import ecommerce from '../assets/ecommerce.png'
import pptxIcon from '../assets/pptx.png'
import { useNavigate } from 'react-router-dom';
const About = () => {
    const navigate = useNavigate();
    const changePage = () => {
        navigate('/categories')
    }
    return (
        <section className="p-5 p-lg-0 pt-5 text-center text-sm-start" style={{marginTop: '50px'}}>
        <div className="container">
            <div className="d-lg-flex align-items-center justify-content-between">
                <div>
                    <h1 className="text-dark">Создавайте впечатляющие<span className="text-primary">
                        презентации в формате PPTX
                    </span> всего за несколько минут благодаря нашей удобной системе конвертации текста, аудио и видео! </h1>
                    <p className="lead my-4 text-dark">
                    Наша система конвертации PPTX использует передовые технологии<span className="text-danger"> искусственного интеллекта</span> , чтобы обеспечить высокую точность и эффективность в конвертации <span className="text-danger">текста, аудио и видео в удобный формат pptx.</span> 
                    </p>
                    <button className="btn btn-primary btn-lg" onClick={changePage}>Конвертировать</button>
                </div>
                <img className="img-fluid w-40 d-none d-sm-block" src={pptxIcon} alt=""/>
            </div>
        </div>
    </section>
    )
}
export default About