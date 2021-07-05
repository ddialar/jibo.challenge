export const checkStartup = (requiredEnvVars: string[]) => {
  const nonConfiguredVariables = requiredEnvVars.reduce(
    (result: string[], variable) => Object.keys(process.env).includes(variable) ? result : [...result, variable],
    []
  )

  if (nonConfiguredVariables.length) {
    console.log(`[\x1b[31mERROR\x1b[37m] - [startup] - The next required environment variables are not configured: ${nonConfiguredVariables.join(', ')}`)
    process.exit(1)
  }

  console.log('[ \x1b[32mINFO\x1b[37m] - [startup] - The whole required environment variables are successfully declared')
}
