export default {
    colors: {
        // 🔹 Cores principais (base do app)
        primary: "#6A1B9A", // Roxo principal (destaques e botões)
        primary_light: "#E6E6E6", // Fundo neutro dos cards
        secondary: "#150432", // Cor mais escura (pode ser usada para títulos)

        background: "#ffffff", // Fundo principal do app

        // 🔹 Textos
        text: "#000", // Texto principal
        text_light: "#fff", // Texto claro (botões escuros)

        // 🔹 Cards e elementos da interface
        card_background: "#F0F0F0", // Fundo dos cards de evento
        history_highlight: "#C8191E", // Cor de destaque para eventos passados

        // 🔹 Cores para botões
        button: {
            primary: "#DDE5B6", // Verde-claro do botão "Atualizar Horário"
            secondary: "#E1CE00", // Verde claro do botão "Agendar Horário"
            danger: "#C8191E", // Vermelho do botão "Apagar Horário"
            confirm: "#026A53", // Azul-esverdeado para confirmar ações
        },

        // 🔹 Cores neutras para elementos secundários
        neutral: {
            primary: "#000", // Cor neutra para textos
            secondary: "#F0F0F0", // Cor de fundo secundária
            tertiary: "#7D7D7D", // Cinza médio para textos e botões
            quaternary: "rgba(105, 69, 168, 0.15)", // Cinza claro para botões
        },
    },

    fonts: {
        regular: "Inter_400Regular",
        light: "Inter_300Light",
        bold: "Roboto_700Bold",
        thin: "Roboto_100Thin",
    },
};
