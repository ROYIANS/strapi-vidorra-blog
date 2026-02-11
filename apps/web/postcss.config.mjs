const config = {
  plugins: {
    "@tailwindcss/postcss": {
      // 配置 Tailwind CSS v4 使用物理属性而非逻辑属性
      // 这样 my-8 会编译为 margin-top 和 margin-bottom 而不是 margin-block
    },
  },
};

export default config;
