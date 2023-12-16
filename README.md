## About The Project

The company name generator is a generative AI project that illustrates how AI can be used to generate data with user-given criteria.

The project provides a multi-step questionnaire approach to understanding the business profile. That information is then used on the AI prompt to generate domain names. The domain name availabilities are checked, and recursive name generation is triggered in case the generated domain names do not meet user expectations.

### Built With

Frameworks/Libraries used to bootstrap the application

- Nuxt.js
- Vue 3
- Typescript
- Langchain
- Openai
- Vuetify

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/turgaygulmez/company-name-generator.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your OpenAI key in `.env`
   ```
   OPENAI_API_KEY=xxxxxxxx
   ```

## Usage

1. Run application
   ```sh
   npm run dev
   ```
2. Open http://localhost:3000/
3. Complete the stepper form
4. Get the final domain list in the last step

## Support

Please [open an issue](https://github.com/turgaygulmez/company-name-generator/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/turgaygulmez/company-name-generator/compare/).
