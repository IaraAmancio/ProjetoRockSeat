
const formatador = (data) => {
    return {
        diaNome: {
            longo: dayjs(data).format(`dddd`),
            curto: dayjs(data).format(`ddd`),
        },
        dia: dayjs(data).format(`DD`),
        mes: dayjs(data).format(`MMMM`),
        horas: dayjs(data).format(`HH:mm`)
    }

}

const criarItemAtividade = (atividade) => {
    let dataFull = `${formatador(atividade.data).diaNome.longo}, dia ${formatador(atividade.data).dia} às ${formatador(atividade.data).horas}h`
    let dataShort = `${formatador(atividade.data).diaNome.curto}, ${formatador(atividade.data).dia} <br> ${formatador(atividade.data).horas}h`
    let text = `<div class="card-bg">
        <div>
        <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.50008 10L9.16675 11.6667L12.5001 8.33335M18.3334 10C18.3334 14.6024 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6024 1.66675 10C1.66675 5.39765 5.39771 1.66669 10.0001 1.66669C14.6025 1.66669 18.3334 5.39765 18.3334 10Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.41664 1.81836C9.46249 1.61597 10.5374 1.61597 11.5833 1.81836M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10086C15.5587 3.70022 16.3197 4.46409 16.9158 5.35086M1.8183 11.5834C1.6159 10.5375 1.6159 9.46255 1.8183 8.4167M16.8991 14.6742C16.2998 15.5588 15.5359 16.3198 14.6491 16.9159M18.1816 8.4167C18.384 9.46255 18.384 10.5375 18.1816 11.5834M3.1008 5.32586C3.70016 4.44131 4.46403 3.68026 5.3508 3.0842M5.3258 16.8992C4.44124 16.2998 3.6802 15.536 3.08414 14.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <input type="checkbox" 
        onchange="concluirAtividade(event)"
        value="${atividade.data}" `

    if(atividade.ischecked){
        text += `checked `
    }
    text += `>           
            <span>${atividade.nome}</span>
            </div>
            <time class="short">${dataShort}</time>
            <time class="full">${dataFull}</time>
        </div>
    `
    
    return text;
}


let atividades = [
    {
        nome:'Academia em grupo',
        data: new Date('2024-02-09 10:00'),
        ischecked: false
    },
    {
        nome:'Almoço',
        data: new Date('2024-03-09 12:00'),
        ischecked: false
    },
    {
        nome:'jantar',
        data: new Date('2024-07-02 20:00'),
        ischecked: true
    },
]

const atualizarListaDeAtividades = () => {
    const section = document.querySelector('section');
    section.innerHTML = ``
    if(atividades.length == 0){
        section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`;
        return;
    }
    for (let atividade of atividades){
        section.innerHTML += criarItemAtividade(atividade)
    }
}

atualizarListaDeAtividades();

const salvarAtividade = (event) => {
    event.preventDefault()
    const dados = new FormData(event.target)
    const nome = dados.get("nome");
    const data = dados.get("data");
    const horas = dados.get("horario")
    
    const dataCompleta = new Date(`${data} ${horas}`)

    const atividade = {
        nome: nome,
        data: dataCompleta,
        ischecked: false,
    };

    let repetido = atividades.find(at => at.data.getTime() === dataCompleta.getTime())

    console.log(repetido)
    if(repetido){
        alert("Data/hora indisponíveis!");
        return;
    }

    atividades = [atividade, ...atividades];
    atualizarListaDeAtividades();

}

// atualizar o check-in se a atividade tiver sido marcada como concluida
const concluirAtividade = (event) => {
    const input = event.target
    const dataDesteInput = input.value;

    const atividade = atividades.find((at) => {
        return at.data == dataDesteInput
    }
    );

    if(!atividade){
        return
    }

    atividade.ischecked = !atividade.ischecked;
}


const criarDiasDeSelecao = () => {
    const dias = [
        "2024-02-28",
        "2024-02-29",
        "2024-03-01",
        "2024-03-02",
        "2024-03-03",
    ]
    let format = `` 
    for(dia of dias){
        const formatado = `${formatador(dia).dia} de ${formatador(dia).mes}`
        format += `<option value="${dia}">${formatado}</option>`
    }
    document.querySelector('select[name="data"]')
    .innerHTML = format
}

criarDiasDeSelecao();

const criarHorasDeSelecao = () => {
   
    let horas = ``
    for(let i = 6; i<23; i++){
        // formata o horário, preenche com 0 a esqueda quando o numero só tem um digito
        let hora = String(i).padStart(2, "0")
        horas += `<option value="${hora}:00">${hora}:00</option>`
        horas += `<option value="${hora}:30">${hora}:30</option>`
    }
    document.querySelector('select[name="horario"]')
    .innerHTML = horas
}

criarHorasDeSelecao();