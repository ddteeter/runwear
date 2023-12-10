import antfu from '@antfu/eslint-config'

const antfuConfig = antfu();

export default {
  ...antfuConfig,
  ignores: [ ...antfuConfig.ignores || [], "generated/*", "migrations/*" ]
}