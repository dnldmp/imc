import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Input } from "../components/form/Input";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

type ImcFormData = {
  weight: string;
  height: string
}


const homeFormSchema = yup.object().shape({
  weight: yup.string().required("Peso obrigatório"),
  height: yup.string().required("Altura obrigatória")
})

export default function Home() {
  const [ IMC, setIMC ] = useState("")
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(homeFormSchema)
  })

  const { errors } = formState

  const handleImc: SubmitHandler<ImcFormData> = async (values) => {
    setIMC("")
    const weight = Number(values.weight)
    const height = Number(values.height)
    const imc = (weight / (height * height)).toFixed(2)
    
    setIMC(`${imc} kg/m2`)
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(values);
  }

  return (
    <Flex bg="purple.600" align="center" justify="center" w="100vw" h="100vh">
      <Flex 
        as="form" 
        w="100%" 
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius="8"
        flexDir="column"
        onSubmit={handleSubmit(handleImc)}
      >
        <Stack spacing="4">
          <Input 
            name="weight" 
            label="Peso" 
            {...register('weight')}
            error={errors.weight}
          />
          <Input 
            name="height" 
            label="Altura" 
            {...register('height')}
            error={errors.height}
          />
        </Stack>

        <Button
          mt="6"
          type="submit"
          colorScheme="purple"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Calcular IMC
        </Button>

        { !!IMC && <Text align="center" pt="4">{IMC}</Text>}
      </Flex>
    </Flex>
  )
} 