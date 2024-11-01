'use client'

import { cn } from '@/lib/utils'
import { Button } from './button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import * as Flags from 'country-flag-icons/react/3x2'
import { ChevronsUpDown, Globe } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command'
import { ScrollArea } from './scroll-area'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Country } from '@/@types/country'

type CountryOption = {
  label: string
  value: string
  postalCode: {
    format: string
    regex: string
  }
}

type CountrySelectProps = {
  className?: string
  value?: string
  disabled?: boolean
  onChange?: (value: CountryOption) => void
}

const CountrySelect = ({
  className,
  value,
  disabled,
  onChange,
}: CountrySelectProps) => {
  const countryQuery = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const response = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,cca2,idd,translations,postalCode',
      )
      const data: Country[] = await response.json()
      return data.sort((a, b) => a.name.common.localeCompare(b.name.common))
    },
  })

  const options = countryQuery.data?.map((country) => ({
    label: country.name.common,
    value: country.cca2,
    postalCode: country.postalCode
  }))

  const handleSelect = React.useCallback(
    (countryOption: CountryOption) => {
      onChange?.(countryOption)
    },
    [onChange],
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={'outline'}
          role="combobox"
          className={cn('w-full justify-between', className)}
          disabled={disabled}
        >
          <div className="flex flex-row">
            <FlagComponent country={value} />
            <ChevronsUpDown
              className={cn(
                'ml-2 h-4 w-4 shrink-0 opacity-50',
                disabled ? 'hidden' : 'opacity-100',
              )}
            />
          </div>
          {value
            ? options?.find((country) => country.value === value)?.label
            : 'Select country...'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <ScrollArea className="h-72">
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>No country found</CommandEmpty>
              <CommandGroup>
                {options
                  ?.filter((x) => x.value)
                  .map((option) => (
                    <CommandItem
                      className="gap-2"
                      key={option.value}
                      onSelect={() => handleSelect(option)}
                    >
                      <FlagComponent country={option.value} />
                      <span className="flex-1 text-sm">{option.label}</span>
                      {option.value && (
                        <span className="text-foreground/50 text-sm">
                          {option.value}
                        </span>
                      )}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

type FlagProps = {
  country?: string
  countryName?: string
}

const FlagComponent = ({ country }: FlagProps) => {
  return (
    <span className="w-5 overflow-hidden rounded-sm">
      {country && Flags[country as keyof typeof Flags]({ title: country })}
      {!country && <Globe size={16} aria-hidden={true} />}
    </span>
  )
}

export { CountrySelect, type CountryOption }
