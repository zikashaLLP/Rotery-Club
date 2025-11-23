// Global Quill setup for table module
// This ensures the table module is registered before any Quill instances are created

let registrationPromise: Promise<void> | null = null

export const registerQuillTableModule = async () => {
  if (registrationPromise) {
    return registrationPromise
  }

  if (typeof window === 'undefined') {
    return Promise.resolve()
  }

  registrationPromise = (async () => {
    try {
      const [QuillModule, QuillBetterTableModule] = await Promise.all([
        import('quill'),
        import('quill-better-table'),
      ])

      const Quill = QuillModule.default
      const QuillBetterTable = QuillBetterTableModule.default

      // Check if already registered
      if (Quill.imports && !Quill.imports['modules/better-table']) {
        Quill.register(
          {
            'modules/better-table': QuillBetterTable,
          },
          true
        )
      }
    } catch (error) {
      console.error('Failed to register Quill table module:', error)
      throw error
    }
  })()

  return registrationPromise
}

// Auto-register on client side
if (typeof window !== 'undefined') {
  registerQuillTableModule().catch(() => {
    // Silently fail - editor will work without tables
  })
}

