// Banco de dados simulado
let database = {
    donos: [],
    pets: [],
    nextDonoId: 1,
    nextPetId: 1
};

// Funções de formatação
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, '');
    if (telefone.length === 11) {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return telefone;
}

// Mostrar mensagens
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = 'message ' + type;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Validar formulário
function validarFormulario(dados) {
    const camposObrigatorios = [
        'nome_completo', 'cpf', 'email', 'telefone', 'endereco',
        'nome_pet', 'especie', 'raca', 'data_nascimento'
    ];
    
    for (let campo of camposObrigatorios) {
        if (!dados[campo]) {
            return `O campo ${campo.replace('_', ' ')} é obrigatório.`;
        }
    }
    return null;
}

// Salvar dados
function salvarNoBanco(dados) {
    // Verificar se CPF já existe
    const cpfExistente = database.donos.find(dono => dono.cpf === dados.cpf);
    if (cpfExistente) {
        return { success: false, error: 'Já existe um cliente com este CPF.' };
    }
    
    // Criar dono
    const novoDono = {
        id: database.nextDonoId++,
        nome_completo: dados.nome_completo,
        cpf: dados.cpf,
        email: dados.email,
        telefone: dados.telefone,
        endereco: dados.endereco
    };
    
    database.donos.push(novoDono);
    
    // Criar pet
    const novoPet = {
        id: database.nextPetId++,
        id_dono: novoDono.id,
        nome_pet: dados.nome_pet,
        especie: dados.especie,
        raca: dados.raca,
        data_nascimento: dados.data_nascimento,
        observacoes: dados.observacoes || ''
    };
    
    database.pets.push(novoPet);
    
    return { success: true };
}

// Event Listeners
document.getElementById('cpf').addEventListener('input', function(e) {
    e.target.value = formatarCPF(e.target.value);
});

document.getElementById('telefone').addEventListener('input', function(e) {
    e.target.value = formatarTelefone(e.target.value);
});

document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados
    const formData = new FormData(this);
    const dados = {};
    for (let [key, value] of formData.entries()) {
        dados[key] = value.trim();
    }
    
    // Validar
    const erro = validarFormulario(dados);
    if (erro) {
        showMessage(erro, 'error');
        return;
    }
    
    // Salvar
    const resultado = salvarNoBanco(dados);
    if (resultado.success) {
        showMessage('Cliente e pet cadastrados com sucesso!', 'success');
        this.reset();
        console.log('Banco atual:', database);
    } else {
        showMessage(resultado.error, 'error');
    }
});

console.log('Sistema Amigo Fiel carregado!');