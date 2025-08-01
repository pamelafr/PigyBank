import { GeoIcon, TrashIcon }from '../../assets/index'
import {Button} from 'react-bootstrap'

function CampaignCard({ campanha, withDelete}) {
    const porcentagemArrecadado = (campanha) =>
        Math.min(100, ((campanha.arrecadado / campanha.meta) * 100).toFixed(2));

    return (
        <div className="campaign-container">
            <div className="campaign-content">
                <div className="campaign-image">
                    <img src={campanha.imagem} alt={campanha.titulo} />
                </div>
                <div className="campaign-info ms-4">
                    <h5 className='fs-2'>{campanha.titulo}</h5>
                    <p className="text-muted fs-5 my-2">
                        <GeoIcon /> {campanha.entidade} • {campanha.local}
                    </p>
                    <p style={{fontSize:'1.1rem'}}>{campanha.descricao}</p>

                    <div className="donation-progress mt-3">
                        <p className='fw-medium'>
                            <span className='me-2'>META:</span> R${campanha.meta}{" "}
                            <span className='ms-5 me-2'>ARRECADADO:</span> R${campanha.arrecadado}
                        </p>
                        <div className="progress-and-text mt-2">
                            <progress
                                max={campanha.meta}
                                value={campanha.arrecadado}
                                className="progress"
                            />
                            <span className="progress-percentage">
                                {porcentagemArrecadado(campanha)}%
                            </span>
                        </div>
                    </div>
                </div>
                {withDelete && <Button variant='outline-danger'> <TrashIcon/> </Button>}
            </div>
        </div>
    )
}

export default CampaignCard