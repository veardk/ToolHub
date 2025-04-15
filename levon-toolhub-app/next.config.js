/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // 只在客户端应用热更新配置
    if (!isServer) {
      config.watchOptions = {
        // 延迟重新构建时间（毫秒）
        aggregateTimeout: 10000, // 增加到10000毫秒（10秒）
        // 减少文件系统轮询频率（毫秒）
        poll: 30000, // 增加间隔到30000毫秒（30秒）
        // 忽略更多文件类型以减轻监控负担
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/public/**',
          '**/.next/**',
          '**/build/**',
          '**/*.log'
        ]
      };
      
      // 减少热更新模块的内存使用
      if (config.optimization) {
        // 减少保留在内存中的模块数量
        if (!config.optimization.moduleIds) {
          config.optimization.moduleIds = 'named';
        }
      }
    }
    return config;
  },
  // 添加图片域名配置，支持任意域名
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
}

module.exports = nextConfig 