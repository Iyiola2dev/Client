


import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React from 'react'

const AddressCard = ({addressInfo}) => {
  return (
    <div>
        <Card>
            <CardContent className="grid gap-4">
                <Label>{addressInfo.address}</Label>
                <Label>{addressInfo.city}</Label>
                <Label>{addressInfo.phoneNumber}</Label>
                <Label>{addressInfo.fullName}</Label>
                <Label>{addressInfo.email}</Label>
                <Label>{addressInfo.additionalNumber}</Label>
                <Label>{addressInfo.notesInformation}</Label>
                <Label>{addressInfo. region}</Label>
            </CardContent>
        </Card>
    </div>
  )
}

export default AddressCard