const { execSync } = require('child_process');

console.log('🚀 Iniciando deploy para Vercel...');

try {
    // Instala dependências
    console.log('📦 Instalando dependências...');
    execSync('npm install', { stdio: 'inherit' });

    // Faz build
    console.log('🔨 Fazendo build...');
    execSync('npm run build', { stdio: 'inherit' });

    // Deploy para Vercel
    console.log('🚀 Fazendo deploy para Vercel...');
    execSync('npx vercel --prod --yes', { stdio: 'inherit' });

    console.log('✅ Deploy concluído com sucesso!');
} catch (error) {
    console.error('❌ Erro durante o deploy:', error.message);
    process.exit(1);
}
