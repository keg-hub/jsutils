const Str = require('../')

describe('Template methods', () => {
  beforeEach(() => jest.resetAllMocks())

  describe('template', () => {
    it('should replace the placeholder values', () => {
      const template = '${ who } in ${ where }'
      const data = { who: 'goats', where: 'boats' }

      expect(Str.template(template, data)).toEqual('goats in boats')
    })

    it('should replace correct value on edge case: 2 closing brackets with content in between the last bracket', () => {
      const template = '${ who } don`t replace me}} in ${ where }'
      const data = { who: 'goats', where: 'boats' }

      expect(Str.template(template, data)).toEqual(
        'goats don`t replace me}} in boats'
      )
    })

    it('should use the fallback when the value does not exist', () => {
      const template = '${ who } in ${ where }'
      const data = { who: 'goats' }
      const fallback = 'coats'

      expect(Str.template(template, data, fallback)).toEqual('goats in coats')
    })

    it('should work with deeply nested values', () => {
      const template = '${ animals.0.farm.type } live in the ${ location }'
      const data = {
        animals: [{ farm: { type: 'goats' } }],
        location: 'boondocks',
      }
      const fallback = 'city'

      expect(Str.template(template, data, fallback)).toEqual(
        'goats live in the boondocks'
      )
    })

    it('should remove the placeholder if no replacement or fallback', () => {
      const template = '${ animals.0.farm.type } live in the ${ location }'
      const data = { animals: [{ farm: { type: 'goats' } }] }

      expect(Str.template(template, data)).toEqual('goats live in the ')
    })

    it('should return the template if its not a string', () => {
      const errMock = console.error
      console.error = jest.fn()
      const t1 = []
      expect(Str.template(t1, {})).toEqual(t1)

      const t2 = false
      expect(Str.template(t2, {})).toEqual(t2)

      const t3 = 1337
      expect(Str.template(t3, {})).toEqual(t3)

      const t4 = {}
      expect(Str.template(t4, {})).toEqual(t4)

      console.error = errMock
    })

    it('should use the fallback or remove when second argument is not a collection', () => {
      const template = '${ animals.0.farm.type } live in the ${ location }'
      const data = 'I am not a collection!'
      const fallback = 'test'

      expect(Str.template(template, data)).toEqual(' live in the ')
      expect(Str.template(template, data, fallback)).toEqual(
        'test live in the test'
      )
    })

    it('should log error when first argument is not a string', () => {
      const oldErr = console.error
      console.error = jest.fn()
      Str.template(false)

      expect(console.error).toHaveBeenCalled()

      console.error = oldErr
    })

    it('should allow overriding the default regex', () => {
      const template = '{{animals.0.farm.type}} live in the {{ location }}'
      const data = {
        animals: [{ farm: { type: 'goats' } }],
        location: 'boondocks',
      }

      Str.template.regex = /{{([^}]*)}}/g
      expect(Str.template(template, data)).toEqual(
        'goats live in the boondocks'
      )
    })
  })

  describe('templateRx', () => {
    it('should override the default regex', () => {
      const template = '{{animals.0.farm.type}} live in the {{ location }}'
      const data = {
        animals: [{ farm: { type: 'goats' } }],
        location: 'boondocks',
      }

      expect(Str.templateRx(template, data)).toEqual(
        'goats live in the boondocks'
      )
    })

    it('should reset the original rx after being called', () => {
      const orgRx = Str.template.regex

      const template = '{{animals.0.farm.type}} live in the {{ location }}'
      const data = {
        animals: [{ farm: { type: 'goats' } }],
        location: 'boondocks',
      }

      expect(Str.templateRx(template, data)).toEqual(
        'goats live in the boondocks'
      )
      expect(Str.template.regex).toBe(orgRx)
    })

    it('should allow passing custom rx as a forth argument', () => {
      const orgRx = Str.template.regex

      const template = '[[animals.0.farm.type]] live in the [[ location ]]'
      const data = {
        animals: [{ farm: { type: 'goats' } }],
        location: 'boondocks',
      }

      expect(Str.templateRx(template, data, ``, /\[\[([^\]]*)\]\]/g)).toEqual(
        'goats live in the boondocks'
      )
      expect(Str.template.regex).toBe(orgRx)
    })
  })
})
