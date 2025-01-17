export const infraDefault = {
  backup: {
    frequency: {
      level: 'high',
      score: 0,
      weight: 8,
    },
    restoration: {
      enabled: true,
      score: 0,
      weight: 9,
    },
    policy: {
      enabled: true,
      score: 0,
      weight: 6,
    },
    storage: {
      local: {
        enabled: true,
        qtde: 3,
        score: 0,
        weight: 9,
      },
      remote: {
        enabled: true,
        qtde: 3,
        score: 0,
        weight: 9,
      },
    },
    description: 'Description Example for demonstration how should be',
    weight: 9,
    points: 0,
  },
  server: {
    enabled: true,
    servers: [
      {
        serverName: 'CLA-SRV01',
        systemOperation: {
          patching: 'Regular',
          score: 0,
          weight: 3,
        },
        config: {
          level: 'high',
          score: 0,
          weight: 7,
        },
        monitoringPerformance: {
          enabled: true,
          score: 0,
          weight: 7,
        },
        weight: 8,
        score: 0,
        description: '',
        points: 0,
        _id: '658dda957705ff79e5d5f051',
      },
      {
        serverName: 'CLA-SRV02',
        systemOperation: {
          patching: 'Irregular',
          score: 0,
          weight: 3,
        },
        config: {
          level: 'high',
          score: 0,
          weight: 7,
        },
        monitoringPerformance: {
          enabled: true,
          score: 0,
          weight: 7,
        },
        weight: 8,
        score: 0,
        description: '',
        points: 0,
        _id: '658dda957705ff79e5d5f052',
      },
    ],
    description: 'Description Example for demonstration how should be',
    weight: 8,
    points: 0,
  },
  ha: {
    enabled: true,
    solutions: ['cluster'],
    tested: true,
    rto: 24,
    score: 0,
    description: 'Description Example for demonstration how should be',
    weight: 7,
    points: 0,
  },
  firewall: {
    enabled: true,
    manufacturer: ['Sophos'],
    rules: 'good',
    segmentation: false,
    vpn: 'medium',
    ips: true,
    backup: true,
    restoration: false,
    monitoring: true,
    score: 0,
    description: 'Description Example for demonstration how should be',
    weight: 9,
    points: 0,
  },
  inventory: {
    enabled: true,
    devices: ['Computadores', 'Notebooks', 'Servidores', 'Equipamentos'],
    contacts: true,
    agentInventory: 'Many',
    score: 0,
    description: 'Description Example for demonstration how should be',
    weight: 7,
    points: 0,
  },
  security: {
    antivirus: 'All',
    policyPassword: true,
    accessAuditing: true,
    gpo: 'Basic',
    lgpd: false,
    score: 0,
    description: 'Description Example for demonstration how should be',
    weight: 8,
    points: 0,
  },
  servicesOutsourcing: {
    email: true,
    fileserver: true,
    intranet: false,
    sites: true,
    erp: true,
    database: false,
    servers: false,
    score: 0,
    description: 'Description Example for demonstration how should be',
    weight: 6,
    points: 0,
  },
  totalScore: 0,
  _id: '658dda957705ff79e5d5f099',
  createdAt: '2023-12-28T20:29:09.878Z',
  updatedAt: '2023-12-28T20:29:09.878Z',
  __v: 0,
};
