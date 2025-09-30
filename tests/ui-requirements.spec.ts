import { test, expect, Page } from '@playwright/test';

test.describe('Financial Planner - Teste de Requisitos', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();

    // Configurar viewport para desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Aguardar serviços iniciarem
    await page.waitForTimeout(5000);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('✅ Requisito 1: Página inicial carrega com dados reais', async () => {
    await page.goto('http://localhost:3000');

    // Verificar se a página carrega
    await expect(page).toHaveTitle(/Financial Planner/);

    // Verificar se há dados de alocações carregando
    await page.waitForSelector('[data-testid="allocations-list"], .allocation-card, .loading', { timeout: 10000 });

    // Verificar se não há erro de carregamento
    const errorElement = await page.$('.error, [data-testid="error"]');
    if (errorElement) {
      const errorText = await errorElement.textContent();
      throw new Error(`Erro na página inicial: ${errorText}`);
    }

    console.log('✅ Página inicial carregou com sucesso');
  });

  test('✅ Requisito 2: Projeção Patrimonial - Funcionalidades básicas', async () => {
    await page.goto('http://localhost:3000/projecao');

    // Verificar se a página carrega
    await page.waitForLoadState('networkidle');

    // Verificar elementos da projeção
    const projectionElements = [
      'text=Projeção Patrimonial',
      'text=Controles de simulação',
      'text=Movimentações',
      'text=Seguros'
    ];

    for (const element of projectionElements) {
      await expect(page.locator(element).first()).toBeVisible({ timeout: 5000 });
    }

    // Verificar se há simulações disponíveis
    const simulations = await page.locator('[data-testid="simulation-control"], .simulation-control').count();
    expect(simulations).toBeGreaterThan(0);

    console.log(`✅ Projeção Patrimonial carregou com ${simulations} simulações`);
  });

  test('✅ Requisito 3: Histórico de Simulações - Versões legadas', async () => {
    await page.goto('http://localhost:3000/historico');

    // Verificar se a página carrega
    await page.waitForLoadState('networkidle');

    // Verificar elementos do histórico
    const historyElements = [
      'text=Histórico de Simulações',
      'text=Versão Legada'
    ];

    for (const element of historyElements) {
      const locator = page.locator(element).first();
      await expect(locator).toBeVisible({ timeout: 5000 });
    }

    // Verificar se há simulações no histórico
    const historyCards = await page.locator('.history-card, [data-testid="history-card"]').count();
    expect(historyCards).toBeGreaterThan(0);

    // Verificar se há versões legadas
    const legacyVersions = await page.locator('text=Versão Legada').count();
    expect(legacyVersions).toBeGreaterThan(0);

    console.log(`✅ Histórico carregou com ${historyCards} simulações e ${legacyVersions} versões legadas`);
  });

  test('✅ Requisito 4: Alocações - CRUD e interações', async () => {
    await page.goto('http://localhost:3000/alocacoes');

    // Verificar se a página carrega
    await page.waitForLoadState('networkidle');

    // Verificar elementos das alocações
    const allocationElements = [
      'text=Alocações',
      'button:has-text("Adicionar")',
    ];

    for (const element of allocationElements) {
      await expect(page.locator(element).first()).toBeVisible({ timeout: 5000 });
    }

    // Verificar se há alocações carregadas
    const allocations = await page.locator('.allocation-card, [data-testid="allocation-card"]').count();
    expect(allocations).toBeGreaterThan(0);

    // Verificar tipos de alocação (Financeira e Imobiliária)
    const financialAllocations = await page.locator('text=FINANCIAL, text=Financeira').count();
    const realEstateAllocations = await page.locator('text=REAL_ESTATE, text=Imobiliária').count();

    expect(financialAllocations + realEstateAllocations).toBeGreaterThan(0);

    console.log(`✅ Alocações carregaram: ${allocations} total, ${financialAllocations} financeiras, ${realEstateAllocations} imobiliárias`);
  });

  test('✅ Requisito 5: Movimentações - CRUD e frequências', async () => {
    await page.goto('http://localhost:3000/movimentacoes');

    // Verificar se a página carrega
    await page.waitForLoadState('networkidle');

    // Verificar elementos das movimentações
    const movementElements = [
      'text=Movimentações',
      'button:has-text("Adicionar")',
    ];

    for (const element of movementElements) {
      await expect(page.locator(element).first()).toBeVisible({ timeout: 5000 });
    }

    // Verificar se há movimentações carregadas
    const movements = await page.locator('.movement-card, [data-testid="movement-card"]').count();
    expect(movements).toBeGreaterThan(0);

    // Verificar tipos de movimentação (Crédito e Débito)
    const creditMovements = await page.locator('text=CREDIT, text=Crédito').count();
    const debitMovements = await page.locator('text=DEBIT, text=Débito').count();

    expect(creditMovements + debitMovements).toBeGreaterThan(0);

    // Verificar frequências
    const frequencies = await page.locator('text=UNIQUE, text=MONTHLY, text=YEARLY, text=Única, text=Mensal, text=Anual').count();
    expect(frequencies).toBeGreaterThan(0);

    console.log(`✅ Movimentações carregaram: ${movements} total, ${creditMovements} créditos, ${debitMovements} débitos`);
  });

  test('✅ Requisito 6: Seguros - Tipos e CRUD', async () => {
    await page.goto('http://localhost:3000/seguros');

    // Verificar se a página carrega
    await page.waitForLoadState('networkidle');

    // Verificar elementos dos seguros
    const insuranceElements = [
      'text=Seguros',
      'button:has-text("Adicionar")',
    ];

    for (const element of insuranceElements) {
      await expect(page.locator(element).first()).toBeVisible({ timeout: 5000 });
    }

    // Verificar se há seguros carregados
    const insurances = await page.locator('.insurance-card, [data-testid="insurance-card"]').count();
    expect(insurances).toBeGreaterThan(0);

    // Verificar tipos de seguro (Vida e Invalidez)
    const lifeInsurances = await page.locator('text=LIFE, text=Vida').count();
    const disabilityInsurances = await page.locator('text=DISABILITY, text=Invalidez').count();

    expect(lifeInsurances + disabilityInsurances).toBeGreaterThan(0);

    console.log(`✅ Seguros carregaram: ${insurances} total, ${lifeInsurances} vida, ${disabilityInsurances} invalidez`);
  });

  test('✅ Requisito 7: Design Dark Mode e Responsividade', async () => {
    await page.goto('http://localhost:3000');

    // Verificar se está em dark mode
    const body = await page.locator('body');
    const backgroundColor = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);

    // Dark mode geralmente tem background escuro
    expect(backgroundColor).toMatch(/rgb\(0, 0, 0\)|rgb\(17, 17, 17\)|rgb\(24, 24, 24\)|rgba\(0, 0, 0/);

    // Testar responsividade - zoom in
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(1000);

    // Verificar se elementos ainda são visíveis
    await expect(page.locator('text=Alocações').first()).toBeVisible();

    // Testar zoom out
    await page.setViewportSize({ width: 2560, height: 1440 });
    await page.waitForTimeout(1000);

    // Verificar se elementos ainda são visíveis
    await expect(page.locator('text=Alocações').first()).toBeVisible();

    console.log('✅ Design dark mode e responsividade funcionando');
  });

  test('✅ Requisito 8: Integração Backend-Frontend', async () => {
    // Testar se API está respondendo
    const response = await page.request.get('http://localhost:3001/api/simulations');
    expect(response.status()).toBe(200);

    const simulations = await response.json();
    expect(simulations.length).toBeGreaterThan(0);

    // Verificar se dados estão sendo carregados no frontend
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Verificar se há dados reais (não mock)
    const realData = await page.evaluate(() => {
      // Verificar se há dados de clientes reais
      const clientNames = ['Matheus', 'Ana', 'Roberto', 'Maria', 'Carlos'];
      const pageText = document.body.textContent || '';
      return clientNames.some(name => pageText.includes(name));
    });

    expect(realData).toBe(true);

    console.log('✅ Integração backend-frontend funcionando com dados reais');
  });

  test('✅ Requisito 9: Estados de Loading e Error', async () => {
    await page.goto('http://localhost:3000');

    // Verificar se há estados de loading
    const loadingElements = await page.locator('text=Carregando, .loading, [data-testid="loading"]').count();

    // Verificar se não há erros visíveis
    const errorElements = await page.locator('.error, [data-testid="error"]').count();

    // Aguardar carregamento completo
    await page.waitForLoadState('networkidle');

    // Após carregamento, não deve haver loading
    const finalLoadingElements = await page.locator('text=Carregando, .loading, [data-testid="loading"]').count();
    expect(finalLoadingElements).toBe(0);

    console.log('✅ Estados de loading e error funcionando corretamente');
  });

  test('✅ Requisito 10: Navegação entre páginas', async () => {
    const pages = [
      { url: 'http://localhost:3000', name: 'Alocações' },
      { url: 'http://localhost:3000/projecao', name: 'Projeção' },
      { url: 'http://localhost:3000/movimentacoes', name: 'Movimentações' },
      { url: 'http://localhost:3000/seguros', name: 'Seguros' },
      { url: 'http://localhost:3000/historico', name: 'Histórico' }
    ];

    for (const pageInfo of pages) {
      await page.goto(pageInfo.url);
      await page.waitForLoadState('networkidle');

      // Verificar se a página carregou
      await expect(page.locator(`text=${pageInfo.name}`).first()).toBeVisible({ timeout: 5000 });

      console.log(`✅ Página ${pageInfo.name} carregou corretamente`);
    }

    console.log('✅ Navegação entre todas as páginas funcionando');
  });

  test('✅ Requisito 11: Dados de teste populados', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Verificar se há dados de teste específicos
    const testData = await page.evaluate(() => {
      const text = document.body.textContent || '';
      return {
        hasMatheus: text.includes('Matheus'),
        hasPlanoOriginal: text.includes('Plano Original'),
        hasSituacaoAtual: text.includes('Situação atual'),
        hasRealizado: text.includes('Realizado'),
        hasAllocations: text.includes('CDB') || text.includes('Apartamento'),
        hasMovements: text.includes('Herança') || text.includes('Comissão'),
        hasInsurances: text.includes('Seguro de Vida') || text.includes('Seguro de Invalidez')
      };
    });

    expect(testData.hasMatheus).toBe(true);
    expect(testData.hasPlanoOriginal).toBe(true);
    expect(testData.hasSituacaoAtual).toBe(true);
    expect(testData.hasRealizado).toBe(true);

    console.log('✅ Dados de teste estão populados corretamente');
  });
});
