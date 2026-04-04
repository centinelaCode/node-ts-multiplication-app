import fs, { mkdir } from 'fs'
import { SaveFile } from './save-file.use-case';


describe('SaveFileUseCase', () => {

  beforeEach(() => {
    const outputFolderExists = fs.existsSync('outputs')
    if (outputFolderExists) { fs.rmSync('outputs', { recursive: true }) }

  //   // clean up antes
  //   fs.rmSync(`custom-outputs/file-destinations`, { recursive: true })

  })

  afterEach(() => {
    // clean up despues
    // fs.rmSync('outputs', { recursive: true })

    // jest.clearAllMocks()
  })



  test('should save file with defaul values', () => {

    const saveFile = new SaveFile()
    const filePath = 'outputs/table.txt'
    const options = { 
      fileContent: 'test content'      
    }

    const result = saveFile.execute( options )
    const fileExiste = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8'})
    
    // console.log(fileContent)
    
    expect(result).toBe( true )
    expect(fileExiste).toBe( true )
    expect(fileContent).toBe( options.fileContent )
  })



  test('should save file with custom values', () => {

    const saveFile = new SaveFile()
    // const filePath = 'outputs/table.txt'
    const options = { 
      fileContent: 'custom content',
      fileDestination: `custom-outputs/file-destinations`, 
      fileName: 'custom-table-name'   
    }
    const filePath = `${options.fileDestination}/${options.fileName}.txt`

    const result = saveFile.execute( options )
    const fileExiste = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8'})

    // console.log(fileContent)

    expect(result).toBe( true )
    expect(fileExiste).toBe( true )
    expect(fileContent).toBe( options.fileContent )
  })



  test('should return false if directory could not created', () => {

    const customOptions = { 
      fileContent: 'custom content',
      fileDestination: `custom-outputs/file-destinations`, 
      fileName: 'custom-table-name'   
    }

    const saveFile = new SaveFile()
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
      () => {throw new Error('This is a custom error message from testing')}
    )

    const result = saveFile.execute(customOptions)

    expect( result ).toBe( false )

    // clean mock implementation  (spy)
    mkdirSpy.mockRestore()
  })

  

  test('should return false if file could not be created', () => {

    const customOptions = { 
      fileContent: 'custom content',
      fileDestination: `custom-outputs/file-destinations`, 
      fileName: 'custom-table-name'   
    }

    const saveFile = new SaveFile()
    // const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
    //   () => {throw new Error('This is a custom error message from testing')}
    // )

    const result = saveFile.execute({ fileContent: 'Hola' })

    expect( result ).toBe( true )
  })


})