/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "course_modalities",
      [
        // Arquitetura e Urbanismo & Design
        {
          course_id: 1,
          modality_id: 1,
        },
        {
          course_id: 2,
          modality_id: 1,
        },
        {
          course_id: 3,
          modality_id: 1,
        },
        {
          course_id: 3,
          modality_id: 4,
        },
        {
          course_id: 4,
          modality_id: 1,
        },
        {
          course_id: 4,
          modality_id: 4,
        },
        {
          course_id: 5,
          modality_id: 1,
        },
        {
          course_id: 5,
          modality_id: 4,
        },
        {
          course_id: 6,
          modality_id: 1,
        },
        {
          course_id: 6,
          modality_id: 4,
        },
        {
          course_id: 7,
          modality_id: 4,
        },
        {
          course_id: 8,
          modality_id: 1,
        },
        {
          course_id: 9,
          modality_id: 1,
        },
        {
          course_id: 9,
          modality_id: 2,
        },
        {
          course_id: 9,
          modality_id: 3,
        },
        {
          course_id: 9,
          modality_id: 4,
        },

        // Ciências Agrárias & Meio Ambiente
        {
          course_id: 10,
          modality_id: 4,
        },
        {
          course_id: 11,
          modality_id: 4,
        },

        // Ciências Biológicas e da Saúde
        {
          course_id: 12,
          modality_id: 1,
        },
        {
          course_id: 13,
          modality_id: 1,
        },
        {
          course_id: 13,
          modality_id: 2,
        },
        {
          course_id: 13,
          modality_id: 3,
        },
        {
          course_id: 13,
          modality_id: 4,
        },
        {
          course_id: 14,
          modality_id: 3,
        },
        {
          course_id: 14,
          modality_id: 4,
        },
        {
          course_id: 15,
          modality_id: 1,
        },
        {
          course_id: 16,
          modality_id: 1,
        },
        {
          course_id: 16,
          modality_id: 2,
        },
        {
          course_id: 16,
          modality_id: 3,
        },
        {
          course_id: 16,
          modality_id: 4,
        },
        {
          course_id: 17,
          modality_id: 1,
        },
        {
          course_id: 17,
          modality_id: 3,
        },
        {
          course_id: 18,
          modality_id: 1,
        },
        {
          course_id: 18,
          modality_id: 2,
        },
        {
          course_id: 18,
          modality_id: 3,
        },
        {
          course_id: 18,
          modality_id: 4,
        },
        {
          course_id: 19,
          modality_id: 1,
        },
        {
          course_id: 19,
          modality_id: 4,
        },
        {
          course_id: 20,
          modality_id: 1,
        },
        {
          course_id: 20,
          modality_id: 3,
        },
        {
          course_id: 21,
          modality_id: 4,
        },
        {
          course_id: 22,
          modality_id: 1,
        },
        {
          course_id: 22,
          modality_id: 2,
        },
        {
          course_id: 22,
          modality_id: 3,
        },
        {
          course_id: 23,
          modality_id: 1,
        },
        {
          course_id: 24,
          modality_id: 4,
        },

        // Ciências Humanas Ciências Humanas
        {
          course_id: 25,
          modality_id: 4,
        },
        {
          course_id: 26,
          modality_id: 4,
        },
        {
          course_id: 27,
          modality_id: 4,
        },
        {
          course_id: 28,
          modality_id: 4,
        },
        {
          course_id: 29,
          modality_id: 4,
        },
        {
          course_id: 30,
          modality_id: 3,
        },
        {
          course_id: 30,
          modality_id: 4,
        },
        {
          course_id: 31,
          modality_id: 4,
        },
        {
          course_id: 32,
          modality_id: 3,
        },
        {
          course_id: 33,
          modality_id: 2,
        },
        {
          course_id: 34,
          modality_id: 4,
        },
        {
          course_id: 35,
          modality_id: 4,
        },
        {
          course_id: 36,
          modality_id: 4,
        },
        {
          course_id: 37,
          modality_id: 3,
        },
        {
          course_id: 37,
          modality_id: 4,
        },
        {
          course_id: 38,
          modality_id: 1,
        },
        {
          course_id: 39,
          modality_id: 4,
        },
        {
          course_id: 40,
          modality_id: 4,
        },

        // Ciências Jurídicas
        {
          course_id: 41,
          modality_id: 1,
        },
        {
          course_id: 42,
          modality_id: 4,
        },
        {
          course_id: 43,
          modality_id: 4,
        },
        {
          course_id: 44,
          modality_id: 4,
        },
        {
          course_id: 45,
          modality_id: 4,
        },
        {
          course_id: 46,
          modality_id: 4,
        },

        // Comunicação &amp; Artes Comunicação & Artes
        {
          course_id: 47,
          modality_id: 1,
        },
        {
          course_id: 48,
          modality_id: 3,
        },
        {
          course_id: 49,
          modality_id: 1,
        },
        {
          course_id: 50,
          modality_id: 1,
        },
        {
          course_id: 51,
          modality_id: 1,
        },
        {
          course_id: 52,
          modality_id: 1,
        },
        {
          course_id: 53,
          modality_id: 4,
        },

        // Engenharias
        {
          course_id: 54,
          modality_id: 1,
        },
        {
          course_id: 54,
          modality_id: 2,
        },
        {
          course_id: 54,
          modality_id: 4,
        },
        {
          course_id: 55,
          modality_id: 1,
        },
        {
          course_id: 55,
          modality_id: 2,
        },
        {
          course_id: 55,
          modality_id: 3,
        },
        {
          course_id: 55,
          modality_id: 4,
        },
        {
          course_id: 56,
          modality_id: 1,
        },
        {
          course_id: 56,
          modality_id: 2,
        },
        {
          course_id: 57,
          modality_id: 1,
        },
        {
          course_id: 57,
          modality_id: 2,
        },
        {
          course_id: 57,
          modality_id: 3,
        },
        {
          course_id: 57,
          modality_id: 4,
        },
        {
          course_id: 58,
          modality_id: 1,
        },
        {
          course_id: 58,
          modality_id: 3,
        },
        {
          course_id: 58,
          modality_id: 4,
        },
        {
          course_id: 59,
          modality_id: 1,
        },
        {
          course_id: 60,
          modality_id: 1,
        },
        {
          course_id: 60,
          modality_id: 3,
        },
        {
          course_id: 60,
          modality_id: 4,
        },
        {
          course_id: 61,
          modality_id: 1,
        },
        {
          course_id: 61,
          modality_id: 3,
        },
        {
          course_id: 61,
          modality_id: 4,
        },
        {
          course_id: 62,
          modality_id: 1,
        },
        {
          course_id: 63,
          modality_id: 4,
        },
        {
          course_id: 64,
          modality_id: 4,
        },

        // Gestão & Negócios
        {
          course_id: 65,
          modality_id: 1,
        },
        {
          course_id: 65,
          modality_id: 3,
        },
        {
          course_id: 65,
          modality_id: 4,
        },
        {
          course_id: 66,
          modality_id: 1,
        },
        {
          course_id: 66,
          modality_id: 2,
        },
        {
          course_id: 66,
          modality_id: 3,
        },
        {
          course_id: 66,
          modality_id: 4,
        },
        {
          course_id: 67,
          modality_id: 2,
        },
        {
          course_id: 67,
          modality_id: 4,
        },
        {
          course_id: 68,
          modality_id: 3,
        },
        {
          course_id: 68,
          modality_id: 4,
        },
        {
          course_id: 69,
          modality_id: 3,
        },
        {
          course_id: 69,
          modality_id: 4,
        },
        {
          course_id: 70,
          modality_id: 3,
        },
        {
          course_id: 70,
          modality_id: 4,
        },
        {
          course_id: 71,
          modality_id: 3,
        },
        {
          course_id: 71,
          modality_id: 4,
        },
        {
          course_id: 72,
          modality_id: 4,
        },
        {
          course_id: 73,
          modality_id: 3,
        },
        {
          course_id: 73,
          modality_id: 4,
        },
        {
          course_id: 74,
          modality_id: 2,
        },
        {
          course_id: 74,
          modality_id: 3,
        },
        {
          course_id: 74,
          modality_id: 4,
        },
        {
          course_id: 75,
          modality_id: 4,
        },
        {
          course_id: 76,
          modality_id: 3,
        },
        {
          course_id: 76,
          modality_id: 4,
        },
        {
          course_id: 77,
          modality_id: 4,
        },
        {
          course_id: 78,
          modality_id: 3,
        },
        {
          course_id: 78,
          modality_id: 4,
        },
        {
          course_id: 79,
          modality_id: 4,
        },
        {
          course_id: 80,
          modality_id: 3,
        },
        {
          course_id: 80,
          modality_id: 4,
        },
        {
          course_id: 81,
          modality_id: 1,
        },

        // TI & Computação
        {
          course_id: 82,
          modality_id: 1,
        },
        {
          course_id: 82,
          modality_id: 2,
        },
        {
          course_id: 82,
          modality_id: 3,
        },
        {
          course_id: 82,
          modality_id: 4,
        },
        {
          course_id: 83,
          modality_id: 3,
        },
        {
          course_id: 83,
          modality_id: 4,
        },
        {
          course_id: 84,
          modality_id: 1,
        },
        {
          course_id: 84,
          modality_id: 2,
        },
        {
          course_id: 84,
          modality_id: 3,
        },
        {
          course_id: 84,
          modality_id: 4,
        },
        {
          course_id: 85,
          modality_id: 3,
        },
        {
          course_id: 86,
          modality_id: 1,
        },
        {
          course_id: 86,
          modality_id: 3,
        },
        {
          course_id: 87,
          modality_id: 1,
        },
        {
          course_id: 87,
          modality_id: 4,
        },
        {
          course_id: 88,
          modality_id: 4,
        },
        {
          course_id: 89,
          modality_id: 4,
        },
        {
          course_id: 90,
          modality_id: 1,
        },
        {
          course_id: 90,
          modality_id: 2,
        },
        {
          course_id: 90,
          modality_id: 4,
        },
        {
          course_id: 91,
          modality_id: 4,
        },

        // Turismo &amp; Hospitalidade Turismo & Hospitalidade
        {
          course_id: 92,
          modality_id: 4,
        },
        {
          course_id: 93,
          modality_id: 1,
        },
        {
          course_id: 93,
          modality_id: 3,
        },
        {
          course_id: 93,
          modality_id: 4,
        },
        {
          course_id: 94,
          modality_id: 4,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("course_modalities", null, {});
  },
};
