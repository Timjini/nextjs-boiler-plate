import { sum } from "@/app/lib/sum"

describe('sum function', () => {
  it('adds two numbers', () => {
    expect(sum(2, 3)).toBe(5)
    expect(sum(-1, 1)).toBe(0)
  })
})
