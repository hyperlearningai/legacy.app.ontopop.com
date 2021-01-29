import getNeighbours from '../../utils/getNeighbours'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { triplesPerNode } from '../fixtures/triplesPerNode.js'

const selectedNodeId = 'http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep'
const classesFromApi = OwlClasses

describe('getNeighbours', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when separationDegree = 0', async () => {
    const separationDegree = 0

    const result = getNeighbours({
      selectedNodeId,
      separationDegree,
      classesFromApi,
      triplesPerNode
    })

    expect(result).toEqual(['http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep'])
  })

  it('should work correctly when separationDegree = 1', async () => {
    const separationDegree = 1

    const result = getNeighbours({
      selectedNodeId,
      separationDegree,
      classesFromApi,
      triplesPerNode
    })

    expect(result).toEqual(
      {
        neighbourEdges: [
          'http://webprotege.stanford.edu/RDWT4jt5mF3fw4zrooDr58g',
          'http://www.w3.org/2000/01/rdf-schema#subclassof',
          'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
          'http://webprotege.stanford.edu/RC0fF4cbTcg59fvYtEu1FF0',
          'http://webprotege.stanford.edu/RDgkQlvQbb2skaXpfhIEAp8',
          'http://webprotege.stanford.edu/R7hoT86zDXtTKlGVmxqJRio',
          'http://webprotege.stanford.edu/RDhasq1hVj3O5iWytoHK065',
          'http://webprotege.stanford.edu/RB9hSN5JimVLMgBjRg72MWG',
          'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay',
          'http://webprotege.stanford.edu/RcNW56SFgi34icUZNpsOET',
          'http://webprotege.stanford.edu/RYIoLKdwlygMWF57BNuMib',
          'http://webprotege.stanford.edu/R8fzvBl85R2Nc2SqsikiKp9',
          'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
        ],
        neighbourNodes: [
          'http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep',
          'http://webprotege.stanford.edu/R734t4iI6j8MPmpJsIqO2v4',
          'http://webprotege.stanford.edu/R735Cwtcs6mgZedTI2DBpFK',
          'http://webprotege.stanford.edu/R7hlktFumJq5RpggEzEv2xi',
          'http://webprotege.stanford.edu/R7l0LqjYK03DLCUM5XgsbGk',
          'http://webprotege.stanford.edu/R8MzvxsWzbT1CeZSELKf1Ku',
          'http://webprotege.stanford.edu/R8VPKVDGeDVRPQznK4rL0ea',
          'http://webprotege.stanford.edu/R8mqmfFAtvpjQNyrdiVTAmG',
          'http://webprotege.stanford.edu/R8oNiHimqYAWPxl0guoDLFp',
          'http://webprotege.stanford.edu/R94oKO9u1LgzfqODgcPAc8L',
          'http://webprotege.stanford.edu/RJ4FstTjtD6dNQx4agULMp',
          'http://webprotege.stanford.edu/R3WvW1lERMZ6UCSsaAdkx1',
          'http://webprotege.stanford.edu/RDZVwEGYIdGxSF0y5yFOhwG',
          'http://webprotege.stanford.edu/RDUwHG4VnwQTyDDhhsWSwgS',
          'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
          'http://webprotege.stanford.edu/R9yaUi67502d49oMbx70wiF',
          'http://webprotege.stanford.edu/RFC5Q9hfMGLXk65hXqNCzp',
          'http://webprotege.stanford.edu/Rj3NXx72nCWC2S8JjoFjon',
          'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9',
          'http://webprotege.stanford.edu/RBmqEHPuKuvpNznItviKdyK',
          'http://webprotege.stanford.edu/RBBDxx5ZaIbg5ASqGAeyKGg',
          'http://webprotege.stanford.edu/RBKQgaabYcnNDy5hL7YKCKt',
          'http://webprotege.stanford.edu/RCGrVyxcVdUB7rI7qGrKvTF',
          'http://webprotege.stanford.edu/RCOdkBizz0dWtRTEjZSfqP8',
          'http://webprotege.stanford.edu/RCrgRyMOzbaY6vxlnONgyzo',
          'http://webprotege.stanford.edu/RDpQmuXpzJOM9XhMdRRxaOJ',
          'http://webprotege.stanford.edu/RXys68405bldLT5N3pTI0u',
          'http://webprotege.stanford.edu/Ree4nJbmBksWE1ufpmuUfp',
          'http://webprotege.stanford.edu/RqrTW48Q37Okpfre6W4ULW',
          'http://webprotege.stanford.edu/RxMK8BflSk74kqDWT4eHTy',
        ],

      }
    )
  })

  it('should work correctly when separationDegree = 2', () => {
    const separationDegree = 2

    const result = getNeighbours({
      selectedNodeId,
      separationDegree,
      classesFromApi,
      triplesPerNode
    })

    expect(result).toEqual(
      {
        neighbourEdges: [
          'http://webprotege.stanford.edu/RDWT4jt5mF3fw4zrooDr58g',
          'http://www.w3.org/2000/01/rdf-schema#subclassof',
          'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
          'http://webprotege.stanford.edu/RC0fF4cbTcg59fvYtEu1FF0',
          'http://webprotege.stanford.edu/RDgkQlvQbb2skaXpfhIEAp8',
          'http://webprotege.stanford.edu/R7hoT86zDXtTKlGVmxqJRio',
          'http://webprotege.stanford.edu/RDhasq1hVj3O5iWytoHK065',
          'http://webprotege.stanford.edu/RB9hSN5JimVLMgBjRg72MWG',
          'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay',
          'http://webprotege.stanford.edu/RcNW56SFgi34icUZNpsOET',
          'http://webprotege.stanford.edu/RYIoLKdwlygMWF57BNuMib',
          'http://webprotege.stanford.edu/R8fzvBl85R2Nc2SqsikiKp9',
          'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
          'http://webprotege.stanford.edu/R7cbyWVOLsYCR1NFY11TBjJ',
          'http://webprotege.stanford.edu/RCK5ewyfmAkLZWg9Mwb7MY',
          'http://webprotege.stanford.edu/RvMCpTSGsQmEAyy8Mi6fdN',
          'http://webprotege.stanford.edu/RCmUfm0eeBA3SpSDhY4GHOe',
          'http://webprotege.stanford.edu/R7uRVbFaeQ4xCgAEayawrZ3',
          'http://webprotege.stanford.edu/RbjcXDTrplTouTeWRoMMe7',
          'http://webprotege.stanford.edu/R8Pp0U9lbiy2Wpdm6YzyV5m',
          'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
          'http://webprotege.stanford.edu/R8XmPwbVWaRiEyUv3kxunaF',
          'http://webprotege.stanford.edu/R7I1rNuvyyDwzTcsAAofisu',
          'http://webprotege.stanford.edu/R7IaR9YG9mGzOkseoqQ4Rzi',
          'http://webprotege.stanford.edu/RXCmh2J46cqAwwT2c4D7Bx',
          'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
          'http://webprotege.stanford.edu/R4I2v4Y7su3Adf0Vcj6TWd',
          'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
          'http://webprotege.stanford.edu/R8EXGHPfSLDiLihUtTOLFsB',
          'http://webprotege.stanford.edu/R8Fp5FKHZWgNVNiLcHuAtPf',
          'http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv',
          'http://webprotege.stanford.edu/R83hFPamR9Qma90o0ltJtC7',
          'http://webprotege.stanford.edu/R89lHzrBYZLIc1RgkMScjIW',
          'http://webprotege.stanford.edu/RuflVNuPASFn75l7LznQc0',
          'http://webprotege.stanford.edu/R8UlzVcWWjnYzxJxqtXIIFd',
          'http://webprotege.stanford.edu/RDzbWoYkp7g1ljEL076ahtw',
          'http://webprotege.stanford.edu/R7V7p8sdl5TpSs0cd7gZvqr',
          'http://webprotege.stanford.edu/RCt16VHlp30eNXujyqS0ik9',
          'http://webprotege.stanford.edu/RC9oNNab0poBq3VZzEoHIcM',
          'http://webprotege.stanford.edu/R79SeNap6q11kTo4DsroWaC',
          'http://webprotege.stanford.edu/R7dYrsdk1L1bcLR0A9vS5QP',
          'http://webprotege.stanford.edu/RBog5Fl0hcK19z2umsYIBzn',
          'http://webprotege.stanford.edu/R8jWMWKWG5xCyyCGXksUAbL',
          'http://webprotege.stanford.edu/RBouRer6kTdZCfCZ4kpk7K3',
        ],
        neighbourNodes: [
          'http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep',
          'http://webprotege.stanford.edu/R734t4iI6j8MPmpJsIqO2v4',
          'http://webprotege.stanford.edu/R735Cwtcs6mgZedTI2DBpFK',
          'http://webprotege.stanford.edu/R7hlktFumJq5RpggEzEv2xi',
          'http://webprotege.stanford.edu/R7l0LqjYK03DLCUM5XgsbGk',
          'http://webprotege.stanford.edu/R8MzvxsWzbT1CeZSELKf1Ku',
          'http://webprotege.stanford.edu/R8VPKVDGeDVRPQznK4rL0ea',
          'http://webprotege.stanford.edu/R8mqmfFAtvpjQNyrdiVTAmG',
          'http://webprotege.stanford.edu/R8oNiHimqYAWPxl0guoDLFp',
          'http://webprotege.stanford.edu/R94oKO9u1LgzfqODgcPAc8L',
          'http://webprotege.stanford.edu/RJ4FstTjtD6dNQx4agULMp',
          'http://webprotege.stanford.edu/R3WvW1lERMZ6UCSsaAdkx1',
          'http://webprotege.stanford.edu/RDZVwEGYIdGxSF0y5yFOhwG',
          'http://webprotege.stanford.edu/RDUwHG4VnwQTyDDhhsWSwgS',
          'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
          'http://webprotege.stanford.edu/R9yaUi67502d49oMbx70wiF',
          'http://webprotege.stanford.edu/RFC5Q9hfMGLXk65hXqNCzp',
          'http://webprotege.stanford.edu/Rj3NXx72nCWC2S8JjoFjon',
          'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9',
          'http://webprotege.stanford.edu/RBmqEHPuKuvpNznItviKdyK',
          'http://webprotege.stanford.edu/RBBDxx5ZaIbg5ASqGAeyKGg',
          'http://webprotege.stanford.edu/RBKQgaabYcnNDy5hL7YKCKt',
          'http://webprotege.stanford.edu/RCGrVyxcVdUB7rI7qGrKvTF',
          'http://webprotege.stanford.edu/RCOdkBizz0dWtRTEjZSfqP8',
          'http://webprotege.stanford.edu/RCrgRyMOzbaY6vxlnONgyzo',
          'http://webprotege.stanford.edu/RDpQmuXpzJOM9XhMdRRxaOJ',
          'http://webprotege.stanford.edu/RXys68405bldLT5N3pTI0u',
          'http://webprotege.stanford.edu/Ree4nJbmBksWE1ufpmuUfp',
          'http://webprotege.stanford.edu/RqrTW48Q37Okpfre6W4ULW',
          'http://webprotege.stanford.edu/RxMK8BflSk74kqDWT4eHTy',
          'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
          'http://webprotege.stanford.edu/R8N1a0K78gZZbVLw2P1NkTX',
          'http://webprotege.stanford.edu/RBNRwyHYDJAexW4IAn1ebkS',
          'http://webprotege.stanford.edu/R89hr3L0oNOwO2C6z1V7rPS',
          'http://webprotege.stanford.edu/RClp8LYLCEjhteHI1BoIOsw',
          'http://webprotege.stanford.edu/RDJpPq1h6rGjSoshUKgfI92',
          'http://webprotege.stanford.edu/RjZNyX4570oeWiMHL21BBu',
          'http://webprotege.stanford.edu/Rr60siMdu9IEvdag4DhF7M',
          'http://webprotege.stanford.edu/R81y0gnn3Ar0DJ8FatMTqK3',
          'http://webprotege.stanford.edu/R7IYZp3FDxOZ1LbVtJN3Z7J',
          'http://webprotege.stanford.edu/RnMK2vS5olvsw9Krge2Ymj',
          'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
          'http://webprotege.stanford.edu/RpqwgnThbB1jmoXEUbPwkN',
          'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf',
          'http://webprotege.stanford.edu/R2mI7fMFtIsSHM8bOfJoEk',
          'http://webprotege.stanford.edu/R7aUPF2nCTl0LhxRiIVdzpc',
          'http://webprotege.stanford.edu/R8InsmDsayORUpOGuBHWc4l',
          'http://webprotege.stanford.edu/R9Be61LJrP8iSlMxyobFOGy',
          'http://webprotege.stanford.edu/R9ixi0I9o1Re8bM8EK5V8ed',
          'http://webprotege.stanford.edu/RBm7cF8aYrHL1CNgkiu5PNb',
          'http://webprotege.stanford.edu/RDHWjhBCCAPiD1rreqlEMZh',
          'http://webprotege.stanford.edu/RtN2Zu9OP2GsaPU9toX3UM',
          'http://webprotege.stanford.edu/RmVBgJPMOQ5Amchla0VZUw',
          'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
          'http://webprotege.stanford.edu/R70aV3VB8Lz4m2Yc60vk1oL',
          'http://webprotege.stanford.edu/RBcXX4d5QQiXpD9Uvmk1E7D',
          'http://webprotege.stanford.edu/R7kFYLBMrwSIReHdO0qWzl1',
          'http://webprotege.stanford.edu/R79918d31mkj7gGPmR00us9',
          'http://webprotege.stanford.edu/R8PzvuuoJlhu0qdom6r1qRQ',
          'http://webprotege.stanford.edu/R9uZJhZUKipFsqrD1TUaca1',
          'http://webprotege.stanford.edu/RDEq6i5M8SGrbQ7vXzpqiI2',
          'http://webprotege.stanford.edu/RDOVqibcKPQJUgd5MLw7f9D',
          'http://webprotege.stanford.edu/R7xOxa2KHyXr6hfeRrQ83oY',
          'http://webprotege.stanford.edu/RkuHSxIaFD91qBEbFsFiU4',
          'http://webprotege.stanford.edu/RDZQxNkcGSsNALjBJH6keFD',
          'http://webprotege.stanford.edu/RF3YeWGVEQjj16Hy07lXyU',
          'http://webprotege.stanford.edu/RbBV8PcIsbUoWpY4Tu9xUN',
          'http://webprotege.stanford.edu/Rigjqi5P4ZscabU1Pot3hK',
          'http://webprotege.stanford.edu/RuAatmiCENCkgAWQlDVsZC',
          'http://webprotege.stanford.edu/RxuHv1LeenSYiEIoMyhxzS',
          'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          'http://webprotege.stanford.edu/R9sbR69tmanyzKyA39GGMRD',
          'http://webprotege.stanford.edu/RCnRceKsHZf8Gt9UvDjM6We',
          'http://webprotege.stanford.edu/RDXfAVuWRwr0N4TV6QEbADY',
          'http://webprotege.stanford.edu/RFwjTev6moOjE08akYHzWP',
          'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
          'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
          'http://webprotege.stanford.edu/R7QV72ON1DRX7lQMsI664VX',
          'http://webprotege.stanford.edu/R7UAD7hI7XyoTLSlVXwBj3k',
          'http://webprotege.stanford.edu/RCuUHUwF8sOhovt9F5cgPYA',
          'http://webprotege.stanford.edu/RCTsx4McKN1jh7Rr2zizjAf',
          'http://webprotege.stanford.edu/RDwvKVBMMMUesirDL2C2S1O',
          'http://webprotege.stanford.edu/R7ziZlwBCU3dDShTGeoBjYR',
          'http://webprotege.stanford.edu/RBd3wT8jsLdCGapuQrUCMwO',
          'http://webprotege.stanford.edu/RBhZTpXvMJckgjC601QBKzJ',
          'http://webprotege.stanford.edu/R7YIZpydsaz383PdnJekN8S',
          'http://webprotege.stanford.edu/R9QL7GzNO6C7vUbpfDfCJk6',
          'http://webprotege.stanford.edu/R9r0DVvDkFW6GmN4bDUNsyl',
          'http://webprotege.stanford.edu/R9uvMZD48MrRf3iKMKAiNCj',
          'http://webprotege.stanford.edu/RDIxodv8FKzm0NUvObC5ThP',
          'http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV',
          'http://webprotege.stanford.edu/R7msJHfQBx9IyBoi6uDKJ2m',
          'http://webprotege.stanford.edu/R8EHiJLLiGn2iUnQEObykIx',
          'http://webprotege.stanford.edu/R8MmTPbBMzS5oRDuNBE43G7',
          'http://webprotege.stanford.edu/R8x8fOmbMnQnR2JiBxkoWAv',
          'http://webprotege.stanford.edu/RB1PjJpc3OQDXScPJQJpAj9',
          'http://webprotege.stanford.edu/RDWl7SktPJhdQATIWmkeWP4',
          'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb',
          'http://webprotege.stanford.edu/RUWwziHPSHb0QUR433d6n3',
          'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
          'http://webprotege.stanford.edu/RCdbVM6sx0TFJ2bA7j7XW9T',
          'http://webprotege.stanford.edu/R9CEIYtS6EVWnP7kLOlZGYO',
          'http://webprotege.stanford.edu/R9yHLGw3z6gILmTwQSizzdi',
          'http://webprotege.stanford.edu/R9BdIrtS5xNdcAPHLf4JaEE',
          'http://webprotege.stanford.edu/RDBlPj5mxo9Sheqo9njonK1',
          'http://webprotege.stanford.edu/Rf8re1EdmLU47EIlLtCpzx',
          'http://webprotege.stanford.edu/R7pIV91w7fTKppAHSmrz8n',
          'http://webprotege.stanford.edu/RBJ3sWyEdjzo3HjkcABim8C',
          'http://webprotege.stanford.edu/RBqifrmlk0euN7DLSAdEhDX',
          'http://webprotege.stanford.edu/R9SjJm6J7HbiocTcgtddm8d',
          'http://webprotege.stanford.edu/RCXzH6nTutSI75cTg53tH8q',
          'http://webprotege.stanford.edu/R88oLttBTPxhZOBkekr7j10',
          'http://webprotege.stanford.edu/R9QC3za2HZdtzU3eCgwCNYj',
          'http://webprotege.stanford.edu/R8vPX062NwsvUg0z6NRZerH',
        ],

      }

    )
  })
})
