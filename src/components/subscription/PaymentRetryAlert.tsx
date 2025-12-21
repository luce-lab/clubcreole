
import { AlertTriangle, CreditCard, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useSubscription, FailedPayment } from "@/hooks/useSubscription";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface PaymentRetryAlertProps {
  failedPayments?: FailedPayment[];
  onRetry?: () => void;
  loading?: boolean;
}

export const PaymentRetryAlert = ({
  failedPayments: propFailedPayments,
  onRetry: propOnRetry,
  loading: propLoading
}: PaymentRetryAlertProps) => {
  const subscription = useSubscription();

  const failedPayments = propFailedPayments ?? subscription.failedPayments;
  const onRetry = propOnRetry ?? subscription.retryPayment;
  const loading = propLoading ?? subscription.loading;
  const hasPaymentIssues = subscription.hasPaymentIssues();

  if (!hasPaymentIssues && failedPayments.length === 0) {
    return null;
  }

  const latestFailure = failedPayments[0];
  const totalFailedAmount = failedPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="flex items-center justify-between">
        <span>Problème de paiement</span>
        {failedPayments.length > 1 && (
          <span className="text-sm font-normal">
            {failedPayments.length} paiement(s) en échec
          </span>
        )}
      </AlertTitle>
      <AlertDescription className="mt-2">
        <div className="space-y-3">
          <p>
            {failedPayments.length === 1 ? (
              <>
                Un paiement de <strong>{latestFailure.amount.toFixed(2)} €</strong> a échoué
                {latestFailure.purchase_date && (
                  <> le {format(new Date(latestFailure.purchase_date), "d MMMM yyyy", { locale: fr })}</>
                )}
                .
              </>
            ) : (
              <>
                <strong>{totalFailedAmount.toFixed(2)} €</strong> de paiements ont échoué.
                Veuillez mettre à jour vos informations de paiement.
              </>
            )}
          </p>

          {latestFailure?.attempt_count && latestFailure.attempt_count >= 2 && (
            <p className="text-sm opacity-90">
              <strong>Attention :</strong> Après 3 tentatives échouées, votre abonnement sera suspendu.
              Tentative actuelle : {latestFailure.attempt_count}/3
            </p>
          )}

          {latestFailure?.next_retry_date && (
            <p className="text-sm opacity-90">
              Prochaine tentative automatique :{" "}
              {format(new Date(latestFailure.next_retry_date), "d MMMM yyyy à HH:mm", { locale: fr })}
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <Button
              onClick={onRetry}
              disabled={loading}
              variant="outline"
              size="sm"
              className="bg-white text-red-600 hover:bg-red-50 border-red-200"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Chargement...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Mettre à jour le paiement
                </>
              )}
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};
