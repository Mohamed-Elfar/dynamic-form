# DYNAMIC FORM ENGINE v2.0.1

> config-driven form generator with unified validation core

## SYSTEM ARCHITECTURE
* [CONFIG] -> [GENERATOR] -> [RENDER ENGINE]
* [EVENT HANDLER] <- [VALIDATION CORE] -> [ERROR MANAGER]
* [STATE STORE] <-PERSISTS-> [LOCALSTORAGE ADAPTER]

## INSTALLATION
```bash
$ git clone https://github.com/yourusername/form-engine.git
$ cd form-engine
$ npm install
$ npm run dev
