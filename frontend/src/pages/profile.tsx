import { LogOut, Mail, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useUpdateUserMutation } from '@/hooks/api/useUpdateUserMutation';
import { getInitialsFromName } from '@/lib/utils';

function Profile() {
  const [name, setName] = useState('');
  const { user, loading, logout } = useAuth();
  const { mutateAsync: updateUser, isPending } = useUpdateUserMutation();

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  if (loading) return <p>Carregando...</p>;

  if (!user) return <p>Algo deu errado!</p>;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || name.length < 2)
      return toast.error('O nome deve ter pelo menos 2 caracteres');

    await updateUser(
      { name },
      {
        onSuccess: () => toast.success('Nome atualizado com sucesso'),
        onError: (error) =>
          toast.error(error?.message || 'Erro ao atualizar nome'),
      },
    );
  };

  return (
    <Card className="w-full max-w-112 mx-auto gap-8">
      <CardHeader className="text-center">
        <Avatar size="lg" className="mx-auto mb-5">
          <AvatarFallback className="font-medium text-2xl">
            {getInitialsFromName(user.name)}
          </AvatarFallback>
        </Avatar>
        <CardTitle>{user?.name}</CardTitle>
        <CardDescription>{user?.email}</CardDescription>
      </CardHeader>

      <Separator className="bg-border" />

      <CardContent>
        <form id="edit-profile" onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <Field>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              startIcon={<User />}
            />
          </Field>

          {/* E-mail */}
          <Field>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={user.email}
              startIcon={<Mail />}
              disabled
            />
            <p className="text-xs pt-0.5 text-gray-500">
              O email não pode ser alterado
            </p>
          </Field>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-4">
        <Button
          type="submit"
          form="edit-profile"
          size="icon-xl"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? 'Salvando...' : 'Salvar alterações'}
        </Button>

        <Button
          type="button"
          size="icon-xl"
          variant="outline"
          className="w-full text-gray-700 rounded-lg flex items-center justify-center gap-2"
          onClick={() => logout()}
          disabled={isPending}
        >
          <LogOut className="size-4 text-foreground" />
          <span>Sair da conta</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Profile;
